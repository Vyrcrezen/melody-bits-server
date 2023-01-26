import { RequestHandler } from "express";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { rootDir } from "../../util/rootDir";

export const multerMusicFiles: () => RequestHandler = () => {
    return multer({
        storage: multer.diskStorage({
            destination: (_req, file, cb) => {
                const destination = path.resolve(rootDir, "data", "music_uploads");
                file.destination = destination
                cb(null, destination);
            },
            filename: (_req, file, cb) => {
                const filename = `${uuidv4()}-${file.originalname}`;
                file.filename = filename
                cb(null, filename)
            }
        }),
        // dest: path.resolve(rootDir, "data", "music_uploads"),
        // fileFilter: (req, file, callback) => {
        //     console.log(req.files);

        //     if (file.fieldname === "music_file") {
        //         if (file.mimetype === "audio/mpeg") {
        //             console.log(file);
        //             callback(null, true);
        //         }
        //     }
        //     if (file.fieldname === "cover_image") {
        //         if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        //             console.log(file);
        //             callback(null, true);
        //         }
        //     }
        //     callback(null, false);
        // },
    }).fields([
        { name: "cover_image", maxCount: 1 },
        { name: "music_file", maxCount: 1 },
    ]);
};