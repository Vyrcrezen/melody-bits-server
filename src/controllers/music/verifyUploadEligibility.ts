
import { RequestHandler } from "express";

import { config } from "dotenv";
import { UserAccount } from "../../models/sql/user_account.sql";

config();

export const verifyUploadEligibility: RequestHandler = async (req, _res, next) => {

    try {

        if (!req.jwtAuth?.user_id || (req.jwtAuth.clearance && req.jwtAuth.clearance > 7)) {
            return next(new Error("Unauthorized!"));
        }

        const user = await UserAccount.findByPk(req.jwtAuth?.user_id);

        if (!user) {
            return next(new Error("Unauthorized!"));
        }

        const currentDate = new Date();
        const timeoutDate = new Date(user.upload_timeout ?? 0);

        if (timeoutDate.getTime() > currentDate.getTime()) {
            return next(new Error("Timeout error!"));
        }

        user.upload_timeout = new Date(currentDate.getTime() + (5 * 60000));
        await user.save();

        next();
    }
    catch {
        return next(new Error("There was an error"));
    }
}

