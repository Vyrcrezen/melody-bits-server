import { Request } from 'express';
import { UserCommentMusic } from '../../../../models/sql/user_comment_music.sql';
import { Merge } from "../../../../types/merge";
import { getValidationFromError } from '../../../../util/getValidationFromError';

export const editMusicComment = async (_obj: any, { commentID, commentText } : {commentID?: string, commentText?: string}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    console.log(commentID);

    try {

        if (!context.jwtAuth?.user_id) {
            return {
                code: 401,
                message: "You need to be logged in to edit comments!"
            }
        }

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

        await comment?.update({comment_text: commentText});

        return {
            code: 200,
            message: 'Comment successfully edited!'
        }

    }
    catch (err) {
        return {
            code: 500,
            message: "Couldn't edit the comment!",
            validationError: getValidationFromError(err)
        }
    }
}