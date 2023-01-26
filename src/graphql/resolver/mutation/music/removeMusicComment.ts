import { Request } from 'express';
import { UserCommentMusic } from '../../../../models/sql/user_comment_music.sql';
import { Merge } from "../../../../types/merge";
import { getClearedUser } from '../../../../util/getClearedUser';
import { getValidationFromError } from '../../../../util/getValidationFromError';

export const removeMusicComment = async (_obj: any, { commentID } : {commentID?: number}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    console.log(commentID);

    try {

        let comment: UserCommentMusic | null;

        try {
            comment = await UserCommentMusic.findByPk(commentID);
        }
        catch (err) {
            return {
                code: 400,
                message: "Invalid comment id!"
            }
        }

        try {
            await getClearedUser(context.jwtAuth, comment?.user_id);
        }
        catch (err) {
            return {
                code: 401,
                message: "Unauthorized!"
            }
        }

        await comment?.destroy();

        return {
            code: 200,
            message: 'Comment successfully deleted!'
        }

    }
    catch (err) {
        return {
            code: 500,
            message: "Couldn't delete the comment!",
            validationError: getValidationFromError(err)
        }
    }

}