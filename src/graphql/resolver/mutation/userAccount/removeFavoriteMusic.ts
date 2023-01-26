import { UserAccount } from "../../../../models/sql/user_account.sql";
// import { Music } from '../../models/sql/music.sql';
// import { UserFavoriteMusic } from "../../models/sql/user_favourite_music.sql";
import { Request } from 'express';
import { Merge } from "../../../../types/merge";

export const removeFavoriteMusic = async (_obj: any, { musicId } : {musicId?: number}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    try {
        const badInputReturn = {
            code: 400,
            message: 'Bad input!'
        }

        if (!context.jwtAuth?.user_id) {
            return { ...badInputReturn, message: 'You need to log in to unfavorit a music!' };
        }

        if (typeof musicId !== 'number') {
            return { ...badInputReturn, message: 'Please provide a valid music id!' };
        }

        const user = await UserAccount.findByPk(context.jwtAuth?.user_id );

        try {
            await user?.$remove('favourite_music', musicId);
        }
        catch (err) {
            return { ...badInputReturn, message: 'No music with that Id!' };
        }

        return {
            code: 201,
            message: 'Created!'
        };
    }
    catch (err) {
        return {
            code: 500,
            message: "Failed to remove music from favorite list"
        }
    }
}