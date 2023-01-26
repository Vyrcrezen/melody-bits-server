import { Request } from 'express';
import { UserBio } from '../../../models/sql/userBio.sql';
import { UserAccount } from '../../../models/sql/user_account.sql';
import { Merge } from "../../../types/merge";

export interface UserDataType {
    user_name?: string;
    user_id?: number;
    user_email?: string;
    hashId?: string;
    registration_time?: Date;
    last_online?: Date;
    clearance?: number;
    uploads?: number;
    favorites?: number;
    comment_num?: number;
    bio?: string;
}

export interface GetUserDataResponse {
    code: number;
    data: UserDataType;
    message: string;
    messageCode: string;
}

export const getUserData = async (_obj: any, { user_id } : {user_id?: string}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    let noUser: GetUserDataResponse;
    noUser = {
        code: 400,
        data: {
            user_name: '',
            user_id: 0,
            user_email: '',
            hashId: '',
            registration_time: new Date(0),
            last_online: new Date(0),
            uploads: 0,
            favorites: 0,
            comment_num: 0,
        },
        message: 'User data could not be retrieved!',
        messageCode: 'SR_220'
    }

    try {
        const user = await UserAccount.findByPk(
            user_id,
            {
                include: [
                    {
                        model: UserBio,
                        as: "user_bio"
                    }
                ]
            }
        );


        if (!user) {
            return {...noUser, code: 404, message: 'Internal Error'}
        }

        const hasFullAcess = context.jwtAuth?.clearance === 1 || context.jwtAuth?.clearance === 2 || context.jwtAuth?.user_id === user.id;

        return {
            code: 200,
            message: 'User data successfully retrieved',
            messageCode: 'SR_221',
            data: {
                user_name: user.user_name,
                user_id: hasFullAcess ? user.id : undefined,
                user_email: hasFullAcess ? user.user_email : undefined,
                hashId: hasFullAcess ? user.hash_id : undefined,
                registration_time: user.created_at,
                last_online: user.last_online,
                clearance: hasFullAcess ? user.clearance : undefined,
                uploads: user.upload_num,
                favorites: user.favorite_num,
                comment_num: user.comments_posted,
                bio: user.user_bio?.bio_text
            }
        };
    }
    catch(err) {
        return {...noUser, code: 500, message: 'Internal Error'}

    }
}