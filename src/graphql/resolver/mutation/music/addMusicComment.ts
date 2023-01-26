import { Request } from 'express';
import { UserAccount } from '../../../../models/sql/user_account.sql';
import { Merge } from "../../../../types/merge";
import { getValidationFromError } from '../../../../util/getValidationFromError';

export const addMusicComment = async (_obj: any, { musicId, commentText } : {musicId?: string, commentText?: string}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    console.log(musicId, commentText);

    try {
        if (!context.jwtAuth?.user_id) {
            return {
                code: 401,
                message: "Only registered users can post comments!"
            }
        }

        const initiator = await UserAccount.findByPk(context.jwtAuth.user_id);

        await initiator?.$create('comment', { comment_text: commentText, music_id: musicId });

        return {
            code: 201,
            message: 'Successfully posted!'
        };
    }
    catch (err) {
        return {
            code: 400,
            message: "Failed to add comment to music!",
            validationError: getValidationFromError(err)
        }
    }


}