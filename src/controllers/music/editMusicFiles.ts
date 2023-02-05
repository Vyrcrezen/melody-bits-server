import { RequestHandler } from "express";
import fs from 'fs';
import webpConv from 'webp-converter';

import { NewMusicData } from "../../models/music/newMusicData";
import { AwsS3 } from '../../connections/awsS3';
import { Music } from '../../models/sql/music.sql';
import { Artist } from '../../models/sql/artist.sql';
import { RecordLabel } from '../../models/sql/record_label.sql';
import { Publisher } from '../../models/sql/publisher.sql';
import { Tag } from "../../models/sql/tag.sql";
import { ValidationError } from "class-validator";
import { MusicApproval } from "../../models/sql/music_approval";
import { FieldsNullable } from "../../types/merge";
// import { streamFromBuff } from "../../util/streamFromBuff";

export const editMusicFiles: RequestHandler<{ musicId: string }, any, { musicData: NewMusicData, validationResult: ValidationError[]}> = async (req, res, _next) => {
    const musicData = req.body.musicData;
    const musicId = req.params.musicId;

    console.log('Now updating a music file, id:');
    console.log(musicId);
    console.log('The raw music data from req');
    console.log(musicData);

    let awsS3: AwsS3 | undefined;
    let awsFolderName: string | undefined;
    let imageLocations: Awaited<ReturnType<AwsS3["CompressUploadImage"]>> | undefined;
    let awsMusicKey: string | undefined;

    console.log('Performing some checking...');

    try {
        if (!req.jwtAuth?.user_id) {
            throw new Error('Unauthorized');
        }
        if (!musicId) {
            throw new Error('Missing music id');
        }
        if (
            req.body.validationResult.length > 0 ||
            musicData.cover_image.size > 2097152 ||
            musicData.music_file.size > 20971520
        ) {
            try {
                if (req.files) {
                    if (Array.isArray(req.files)) {
                        req.files.forEach(async (item) => {
                            fs.promises.unlink(item.path);
                        });
                    } else {
                        for (const prop in req.files) {
                            req.files[prop].forEach(async (item) => {
                                fs.promises.unlink(item.path);
                            });
                        }
                    }
                }
            } catch (err) {
                console.log("Failed to delete music files when handling invalid upload!");
            }

            return res.status(400).json({
                code: 400,
                message: "Invalid Data!",
                validationError: req.body.validationResult.map(invalidItem => {
                    return {
                        target: 'Music',
                        path: invalidItem.property,
                        value: musicData.tags,
                        message: invalidItem.constraints
                    }
                })
            });
        }

        //#region MSSQL insert
        [musicData.artist] = await  Artist.findOrCreate({ where: { name: musicData.artist_name } });

        if( musicData.record_label_name) {
            [musicData.record_label] = await  RecordLabel.findOrCreate({ where: { name: musicData.record_label_name } });
        }
        if (musicData.publisher) {
            [musicData.publisher] = await  Publisher.findOrCreate({ where: { name: musicData.publisher } });
        }

        const selectedMusic: FieldsNullable<Music> | null = await Music.findByPk(musicId, {
            include: [
                {
                    model: MusicApproval,
                    as: 'approvals'
                }
            ]
        });


        console.log('This is the music to be updated:');
        console.log(selectedMusic);

        if (!selectedMusic) {
            throw new Error('Coulnd\'t find music with the provided id');
        }
        if (!selectedMusic?.approvals || !selectedMusic.approvals[0]) {
            throw new Error('Corrupt music data, missing Approval table');
        }
        if (!selectedMusic.aws_root) {
            throw new Error('Missing AWS folder');
        }


        selectedMusic.id = musicId;
        selectedMusic.uploader_id = req.jwtAuth.user_id;
        selectedMusic.title = musicData.title;
        selectedMusic.artist_id = musicData.artist.id;
        selectedMusic.record_label_id = musicData?.record_label?.id;
        selectedMusic.publisher_id = musicData?.publisher?.id;
        selectedMusic.album = musicData?.album;
        selectedMusic.link = musicData?.link;
        selectedMusic.music_size = musicData.music_file.size;

        selectedMusic.approver_id = null;

        await selectedMusic.save();
        await MusicApproval.update({ status: 1 }, { where: { id: selectedMusic.approvals[0].id } });

        const tagsToAdd: Tag[] = [];
        for (const tagItem of musicData.tags) {
            tagsToAdd.push((await Tag.findOrCreate({ where: {name: tagItem} }))[0]);
        }
        await selectedMusic.$set('tags', tagsToAdd.map(tagItem => tagItem.id ) );

        //#endregion

        //#region Conversion of webp input
        if (musicData.cover_image.mimetype === 'image/webp') {
            await webpConv.dwebp(musicData.cover_image.path, musicData.cover_image.path.replace('.webp', '.png'), "-o -metadata all");

            await fs.promises.unlink(musicData.cover_image.path);

            musicData.cover_image.path = musicData.cover_image.path.replace('.webp', '.png');
            musicData.cover_image.filename = musicData.cover_image.filename.replace('.webp', '.png');
        }
        //#endregion

        //#region S3 Upload


        awsS3 = AwsS3.getInstance();
        awsFolderName = selectedMusic.aws_root.replace('music-data/', '');

        const audioExtension = musicData.music_file.filename.substring(musicData.music_file.filename.lastIndexOf('.') )
        awsMusicKey = `music-data/${awsFolderName}/music_file${audioExtension}`;

        const awsUploads: [ReturnType<AwsS3["CompressUploadImage"]>, ReturnType<AwsS3["uploadFile"]>] = [
            awsS3.CompressUploadImage(musicData.cover_image.path, musicData.cover_image.filename, awsFolderName),
            awsS3.uploadFile(fs.createReadStream(musicData.music_file.path), awsMusicKey)
        ];

        [imageLocations] = await Promise.all(awsUploads);
        //#endregion

        await fs.promises.unlink(imageLocations.local.mini);
        await fs.promises.unlink(imageLocations.local.normal);
        await fs.promises.unlink(musicData.cover_image.path);
        await fs.promises.unlink(musicData.music_file.path);

        return res.status(201).json({
            message: 'Music upload successful!',
            code: 201,

        });
    }
    catch (err) {
        // Still, delete the local files, as well as the S3 files if present
        try {
            if (imageLocations) {
                await fs.promises.unlink(imageLocations.local.mini);
                await fs.promises.unlink(imageLocations.local.normal);
            }
            await fs.promises.unlink(musicData.cover_image.path);
            await fs.promises.unlink(musicData.music_file.path);
        }
        catch(fsError) {
            console.log('Something is going very wrong in postMusicFiles! Failed to delete files after unsuccessful upload!');
        }

        // try {
        //     if(awsS3) {
        //         const awsKeyArray = [];
        //         if (imageLocations) { awsKeyArray.push(imageLocations?.aws.mini, imageLocations?.aws.normal) }
        //         if (awsMusicKey) { awsKeyArray.push(awsMusicKey); }
        //         if (awsFolderName) { awsKeyArray.push(awsFolderName); }
        //         await awsS3.deleteObjects(awsKeyArray);
        //     }
        // }
        // catch (awsDeletionErr) {
        //     console.log('Couldn\'t clean up aws files after unsuccessful music posting!');
        // }

        try {
            if ((err as Error).message === 'Unauthorized') {
                res.status(400).json({
                    message: 'Unauthorized!'
                });
            }

            return res.status(500).json({
                code: 500,
                message: 'There was an error during upload'
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
