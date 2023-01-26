import { RequestHandler } from "express";
import { AwsS3 } from "../../connections/awsS3";
import { Music } from "../../models/sql/music.sql";
import { streamFromBuff } from "../../util/streamFromBuff";

export const getMusicCover = (getHq = false): RequestHandler<{musicId: number}> => {

    return async (req, res, next) => {

        try {
            const musicData = await Music.findOne({ where: { id: req.params.musicId } });
            const awsImageKey = `${musicData?.aws_root}/cover_image${getHq ? '_hq': ''}.webp`;

            if (!awsImageKey) {
                return res.sendStatus(404);
            }
            const imageData = await AwsS3.getInstance().downloadFile(awsImageKey);

            streamFromBuff(imageData.Body as Buffer).pipe(res);
        }
        catch (err) {
            console.log('Nexting the error..');

            return next(err);
        }
    }
}