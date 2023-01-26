import { RequestHandler } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { config } from "dotenv";
import { UserAccount } from "../../models/sql/user_account.sql";

config();

export const resolveJwt = () => {

    const resolveJwtMiddleware: RequestHandler = async (req, _res, next) => {
        try {
            const authFailed: {
                user_id?: undefined | number,
                isAuthenticated?: boolean,
                comment?: string
            } = {
                user_id: undefined,
                isAuthenticated: false,
                comment: 'No Authorization'
            }

            const authHeader = req.get('Authorization');

            if (!authHeader) {
                req.jwtAuth = authFailed;
                return next();
            };

            const [, token] = authHeader.split(' ');

            if (!token) {
                req.jwtAuth = authFailed;
                return next();
            };

            let decodedToken: string | JwtPayload;

            try {
                decodedToken = jwt.verify(token, process.env.JWT_PVK);
            }
            catch (err) {
                req.jwtAuth = {...authFailed, comment: `${err}`};
                return next();
            }

            if (typeof decodedToken === 'string') {
                throw new Error('Decoded token is of invalid type in autMiddleware!');
            }

            let user = await UserAccount.findByPk(decodedToken.user_id);

            try {
                user = await UserAccount.findByPk(decodedToken.user_id);
            }
            catch (err) {
                req.jwtAuth = { ...authFailed, comment: 'Invalid user id in token!' };
                return next();
            }

            await user?.update({
                last_online: new Date()
            });

            if (user?.is_banned) {
                if (user?.banned_until) {
                    const currentDate = new Date();
                    const banUntilDate = new Date(user.banned_until);

                    if(currentDate.getTime() < banUntilDate.getTime()) {
                        req.jwtAuth = { ...authFailed, comment: 'User is banned!' };
                        return next();
                    }

                    await user.update({
                        is_banned: false,
                    })
                }

            }

            req.jwtAuth = {
                user_id: decodedToken.user_id,
                clearance: decodedToken.clearance,
                comment: 'Valid token!'
            };

            return next();
        }
        catch(err) {
            next(err);
        }
    }

    return resolveJwtMiddleware;
}
