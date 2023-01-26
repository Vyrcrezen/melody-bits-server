import { UserAccount } from "../../../../models/sql/user_account.sql";
// import { Music } from '../../models/sql/music.sql';
// import { UserFavoriteMusic } from "../../models/sql/user_favorite_music.sql";
import { Request } from 'express';
import { Merge } from "../../../../types/merge";
import { getValidationFromError } from "../../../../util/getValidationFromError";
import { Music } from "../../../../models/sql/music.sql";

export const updateFavoriteMusic = async (_obj: any, { musicId, isFavorite } : {musicId?: number, isFavorite?: boolean}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    console.log(isFavorite);

    // const userFavoriteData: Partial<UserFavoriteMusic> = {};
    try {
        if (!context.jwtAuth?.user_id) {
            return {
                code: 400,
                message: 'You need to log in to favorit a music!'
            };
        }

        if (typeof musicId !== 'number') {
            return {
                code: 400,
                message: 'Please provide a valid music id!'
            };
        }

        const user = await UserAccount.findByPk( context.jwtAuth?.user_id,
                {
                    include: {
                        model: Music,
                        as: "favorite_music",
                        through: {
                            where: {
                                user_id: context.jwtAuth?.user_id
                            }
                        }
                    },
                }
            );
        // const music = await Music.findByPk(musicId);

        // console.log(user);
        // console.log(user?.favorite_music);
        // console.log(music);

        // console.log('##');
        // console.log('Now the Magic happens');
        // console.log('##');

        const isMusicPresent = !!(user?.favorite_music ?? []).find(item => item.id === musicId)

        console.log(`The music with the id: ${musicId} is present: ${isMusicPresent}`);

        // await user?.$add('favorite_music', music);

        // console.log('Has instance already?');
        // const hasInstance = await user?.$has('favorite_music', music)
        // console.log(hasInstance);

        try {
            if (!isMusicPresent && isFavorite) {
                await user?.$add('favorite_music', musicId);

                return {
                    code: 200,
                    message: 'MD_301;Music successfully favorited!'
                };
            }
            else if (isMusicPresent && !isFavorite) {
                await user?.$remove('favorite_music', musicId);

                return {
                    code: 200,
                    message: 'MD_302;The music is no longer a favorite!'
                };
            }
        }
        catch (err) {
            return {
                code: 400,
                message: 'No music with that Id!'
            };
        }
        // await user?.$remove('favorite_music', music);

        return {
            code: 200,
            message: 'No operation needed!'
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