import { Router } from "express";
import { multerMusicFiles } from "../controllers/music/multerMusicFiles";

import { postMusicFiles } from "../controllers/music/postMusicFiles";
import { getMusicCover } from "../controllers/music/getMusicCover";

// import multer from "multer";
// import path from "path";
// import { rootDir } from "../util/rootDir";

import { verifyMusicData } from "../controllers/music/verifyMusicData";
import { getMusicFile } from "../controllers/music/getMusicFile";
import { editMusicFiles } from "../controllers/music/editMusicFiles";
import { verifyUploadEligibility } from "../controllers/music/verifyUploadEligibility";
import { verifyEditEligibility } from "../controllers/music/verifyEditEligibility";

export const router = Router();

router.post(
    "/post-new",
    verifyUploadEligibility,
    multerMusicFiles(),
    verifyMusicData,
    // multer({ dest: path.resolve(rootDir, "data", "music_uploads"), fileFilter(_req, file, callback) {

    //     if ( file.fieldname === 'music_file' ) {
    //         if ( file.mimetype === 'audio/mpeg' ) {
    //             callback(null, true);
    //         }
    //     }
    //     if ( file.fieldname === 'cover_image' ) {
    //         if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    //             callback(null, true);
    //         }
    //     }
    //     callback(null, false);
    // }, }).fields([
    //     { name: "cover_image", maxCount: 1 },
    //     { name: "music_file", maxCount: 1 },
    // ]),
    postMusicFiles
);

router.post(
    "/edit/:musicId",
    verifyUploadEligibility,
    verifyEditEligibility,
    multerMusicFiles(),
    verifyMusicData,
    editMusicFiles
);

router.get('/cover-image/:musicId', getMusicCover());
router.get('/cover-image-hq/:musicId', getMusicCover(true));

router.get('/music-file/:musicId', getMusicFile());