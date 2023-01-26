import { UserAccount } from "../../../../models/sql/user_account.sql";
// import { Music } from '../../models/sql/music.sql';
// import { UserFavoriteMusic } from "../../models/sql/user_favorite_music.sql";
import { Request } from 'express';
import { Merge } from "../../../../types/merge";
import { getValidationFromError } from "../../../../util/getValidationFromError";
import { UserMusicRating } from "../../../../models/sql/user_music_rating.sql";
import { Music } from "../../../../models/sql/music.sql";

export const updateMusicRating = async (_obj: any, { musicId, ratingScore } : {musicId?: number, ratingScore?: number}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    const updateMusicAvgRating = async (musicId: number) => {
        const music = await Music.findByPk(musicId, {
            include: {
                model: UserMusicRating,
                as: 'ratings'
            },
        });

        console.log('Found this music to change the ratings:');
        console.log(music);

        if (music) {
            if (music.ratings && music.ratings.length > 0) {
                const ratingSum = music.ratings.reduce((ratingSum, item) => {
                        if (item.rating) {
                            ratingSum += item.rating;
                        }
                        return ratingSum;
                }, 0);

                const ratingsNum = music.ratings.length;
                const avgRating = Math.round((ratingSum / ratingsNum) * 10) / 10;

                await music.update({ avg_rating: avgRating, ratings_num: ratingsNum });
            }
            else {
                await music.update({ avg_rating: null, ratings_num: 0 });
            }
        }
    }

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
                        model: UserMusicRating,
                        as: "ratings"
                    },
                }
            );

        const musicRating = (user?.ratings ?? []).find(item => item.music_id === musicId);

        try {
            if (!musicRating) {

                const userMusicRating = new UserMusicRating({ music_id: musicId, rating: ratingScore, user_id: context.jwtAuth?.user_id });
                await userMusicRating.save();

                await updateMusicAvgRating(musicId);

                return {
                    code: 200,
                    message: 'MD_033;Music rating successfully added!',
                    messageCode: 'MD_033'
                };
            }
            else if (ratingScore !== musicRating.rating) {

                await musicRating.update({'rating': ratingScore});
                await updateMusicAvgRating(musicId);

                return {
                    code: 200,
                    message: 'MD_034;Music rating successfully updated!',
                    messageCode: 'MD_034'
                };
            }
            else {
                await musicRating.destroy();
                await updateMusicAvgRating(musicId);

                return {
                    code: 200,
                    message: 'MD_035;Music rating successfully removed!',
                    messageCode: 'MD_035'
                };
            }
        }
        catch (err) {
            return {
                code: 400,
                message: 'No music with that Id!'
            };
        }
    }
    catch (err) {
        return {
            code: 500,
            message: 'There was an error adding music to the favorite list',
            validationError: getValidationFromError(err)
        }
    }

}