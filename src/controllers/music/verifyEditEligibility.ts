
import { RequestHandler } from "express";

import { config } from "dotenv";
import { Music } from "../../models/sql/music.sql";
import { MusicApproval } from "../../models/sql/music_approval";

config();

export const verifyEditEligibility: RequestHandler<{musicId: string}, any, any> = async (req, _res, next) => {

    try {

        if (!req.jwtAuth?.user_id || (req.jwtAuth.clearance && req.jwtAuth.clearance > 7)) {
            return next(new Error("Unauthorized!"));
        }

        if (!req.params.musicId) {
            return next(new Error("Missing musicId!"));
        }

        const music = await Music.findByPk(req.params.musicId, {
            include: [
                {
                    model: MusicApproval,
                    as: 'approvals'
                }
            ]
        });

        if (!music?.approvals || !(music?.approvals ?? [])[0]) {
            return next(new Error("Missing music approval table. Operation failed!"));
        }

        if (!music?.approvals[0].status || music?.approvals[0].status === 3 ) {
            return next(new Error("The submission process of this music has been terminated!"));
        }

        next();
    }
    catch {
        return next(new Error("There was an error"));
    }
}

