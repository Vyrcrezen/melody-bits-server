import { RequestHandler } from "express";
import { AwsS3 } from "../../connections/awsS3";
import { Music } from "../../models/sql/music.sql";
import { streamFromBuff } from "../../util/streamFromBuff";

export const getMusicFile = (): RequestHandler<{musicId: number}> => {

    return async (req, res, next) => {

        try {
            const musicData = await Music.findOne({ where: { id: req.params.musicId } });
            const awsMusicKey = `${musicData?.aws_root}/music_file.mp3`;

            if (!awsMusicKey || !musicData?.music_size) {
                return res.sendStatus(404);
            }

            const range = req.headers.range || "0";
            const musicSize = musicData?.music_size;
            const chunkSize = 524288; // 262144;
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + chunkSize, musicSize - 1);

            const contentLength = end - start + 1;

            const headers = {
                "Content-Range": `bytes ${start}-${end}/${musicSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "audio/mp3"
            };
            res.writeHead(206, headers);

            const imageData = await AwsS3.getInstance().downloadFile(awsMusicKey, range);

            streamFromBuff(imageData.Body as Buffer).pipe(res);
        }
        catch (err) {
            console.log('Nexting the error..');

            return next(err);
        }
    }
}

// const express = require("express");
// const app = express();
// const fs = require("fs");
// const PORT = process.env.PORT || 3000;

// app.get("/video", (req, res) => {
//   const range = req.headers.range || "0";
//   const videoPath = "./video.mp4";
//   const videoSize = fs.statSync(videoPath).size;
//   const chunkSize = 1 * 1e6;  //  1MB;
//   const start = Number(range.replace(/\D/g, ""));
//   const end = Math.min(start + chunkSize, videoSize - 1);

//   const contentLength = end - start + 1;

//   const headers = {
//     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": contentLength,
//     "Content-Type": "video/mp4",in Node.Js
//   };
//   res.writeHead(206, headers);

//   const stream = fs.createReadStream(videoPath, { start, end });
//   stream.pipe(res);
// });

// app.listen(PORT, console.log("Started on port 3000"));
