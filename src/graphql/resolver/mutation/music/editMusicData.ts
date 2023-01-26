import { Request } from 'express';
import { Op } from 'sequelize';
import { Artist } from '../../../../models/sql/artist.sql';
import { Music } from '../../../../models/sql/music.sql';
import { Publisher } from '../../../../models/sql/publisher.sql';
import { RecordLabel } from '../../../../models/sql/record_label.sql';
import { Tag } from '../../../../models/sql/tag.sql';
import { getClearedUser } from '../../../../util/getClearedUser';
import { getValidationFromError } from '../../../../util/getValidationFromError';

export const editMusicData = async (
    _obj: any,
    {
        id,
        title,
        artistName,
        recordLabelName,
        publisherName,
        link,
        tags
    }: {
        id?: number,
        title?: string,
        artistName?: string,
        recordLabelName?: string,
        publisherName?: string,
        link?: string,
        tags?: {
            add: string[],
            remove: string[]
        }
    },
    context: Partial<Request>
) => {
    try {

        console.log(tags);

        if (!id) {
            return {
                code: 400,
                message: 'Music id is a required argument!'
            }
        }

        const StoredMusicData = await Music.findByPk(id);
        if (!StoredMusicData) {
            return {
                code: 404,
                message: "Didn't find a music by that id!",
            };
        }

        try {
            await getClearedUser(context.jwtAuth, StoredMusicData?.uploader_id);
        }
        catch (err) {
            return err;
        }


        if (artistName) {
            const [artist] = await Artist.findOrCreate({where: {name: artistName}});
            StoredMusicData.artist_id = artist.id;
        }
        if (recordLabelName) {
            const [recordLabel] = await RecordLabel.findOrCreate({where: {name: recordLabelName}});
            StoredMusicData.record_label_id = recordLabel.id;
        }
        if (publisherName) {
            const [publisher] = await Publisher.findOrCreate({where: {name: publisherName}});
            StoredMusicData.publisher_id = publisher.id;
        }

        StoredMusicData.title = title ? title : StoredMusicData.title;
        StoredMusicData.link = link ? link : StoredMusicData.link;

        await StoredMusicData.save();

        if (tags) {
            if (tags.add) {
                const tagsToAdd: Tag[] = [];

                for (const tagItem of tags.add) {
                    tagsToAdd.push((await Tag.findOrCreate({ where: {name: tagItem} }))[0]);
                }
                await StoredMusicData.$set('tags', tagsToAdd.map(tagItem => tagItem.id ) );
            }
            if (tags.remove) {
                const tagsToRemove = await Tag.findAll({ where: { [Op.or]: tags.remove.map(tagItem => { return { name: tagItem } }) } })

                await StoredMusicData.$remove('tags', tagsToRemove.map(tagItem => tagItem.id ) );
            }
        }

        return {
            code: 201,
            message: "Updated!",
        };
    }
    catch (err) {

        return {
            code: 500,
            message: 'Failed to update music data!',
            validationError: getValidationFromError(err)
        }
    }
};