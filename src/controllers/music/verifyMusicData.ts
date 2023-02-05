import { RequestHandler } from "express";
import { validate } from "class-validator";
import { NewMusicData } from "../../models/music/newMusicData";
import { VblNewMusicData } from "../../models/music/vblNewMusicData";
import { UserAccount } from "../../models/sql/user_account.sql";

export const verifyMusicData: RequestHandler = async (req, _res, next) => {
    try {
        if (req.jwtAuth?.user_id) {
            UserAccount.update({ last_online: new Date(), },
                { where: { id: req.jwtAuth?.user_id, }, }
            );
        }

        let fileTypes: { [prop: string]: Express.Multer.File } = {};

        // Extracting mimetypes in a reliable way
        if( req.files ) {
            // If it's an array, validation should fail anyways
            if (!Array.isArray(req.files)){
                for (const propName in req.files) {
                    fileTypes[propName] = req.files[propName][0];
                }
            }
        }

        const musicData = new VblNewMusicData({
            ...req.body,
            ...fileTypes
        } as Partial<NewMusicData>);

        const validationResult = await validate(musicData);

        console.log(req.body);
        console.log(req.files);

        req.body.validationResult = validationResult;
        req.body.musicData = musicData;

        return next();
    }
    catch (err) {
        next(err);
    }
};
