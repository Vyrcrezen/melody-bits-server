import { Request } from 'express';
import { Music } from '../../../../models/sql/music.sql';
import { Merge } from "../../../../types/merge";
import { getValidationFromError } from '../../../../util/getValidationFromError';

export const deleteMusic = async (_obj: any, { musicId } : {musicId?: number}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    try {
        if (!context.jwtAuth?.user_id) {
            return {
                code: 400,
                message: 'You need to log in to delete a music!'
            };
        }

        if (typeof musicId !== 'number') {
            return {
                code: 400,
                message: 'Please provide a valid music id!'
            };
        }

        try {
            const music = await Music.findByPk(musicId);

            if (context.jwtAuth.clearance !== 1 && context.jwtAuth.clearance !== 2 && context.jwtAuth.user_id !== music?.uploader_id) {
                return {
                    code: 400,
                    message: 'You are not authorized to delete this music'
                };
            }

            await music?.destroy();
        }
        catch (err) {
            return {
                code: 400,
                message: 'Music with that id not found.'
            };
        }

        return {
            code: 200,
            message: 'Music successfully deleted!'
        };
    }
    catch (err) {
        return {
            code: 500,
            message: 'There was an error adding music to the favorite list',
            validationError: getValidationFromError(err)
        }
    }
}