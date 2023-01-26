import { RequestHandler } from "express";

export const acceptOptions: RequestHandler = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
}
