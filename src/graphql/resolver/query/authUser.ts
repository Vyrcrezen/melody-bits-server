import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserAccount } from '../../../models/sql/user_account.sql'
import { config } from 'dotenv';

config();

interface authUserArg {
    [prop: string]: any;
    email?: string;
    password?: string;
}

export interface authUserData {
    token?: string;
    user_name?: string;
    clearance?: string;
    pref: {
        lang?: string;
        theme?: string;
    }
}

export interface authUserResponse {
    code: number;
    data: authUserData;
    message: string;
    messageCode: string;
}

export const authUserResolver = async (_obj: any, {email, password}: authUserArg) => {

    let authFailed: authUserResponse;
    authFailed = {
        code: 400,
        data: {
            token: '',
            user_name: '',
            clearance: '',
            pref: {
                lang: 'en',
                theme: 'dark'
            }
        },
        message: 'Authentication failed!',
        messageCode: 'UA_2321'
    }

    try {

        if (!email || !password) { return {...authFailed, message: 'Missing arguments!'}; }

        const user = await UserAccount.findOne({ where: { user_email: email } });

        if (!user) { return {...authFailed, message: 'Please check your e-mail and password, and try again'}; }

        if (user.is_banned) {
            return { ...authFailed, code: 401, message: `Banned until: ${user.banned_until}`, messageCode: "AC_3121" };
        }

        const isAuthenticated = await bcrypt.compare(password, user.user_password as string);

        if (!isAuthenticated) { return {...authFailed, messageCode: 'AC_12312', message: 'Please check your e-mail and password, and try again'}; }

        await user.update({
            last_online: new Date()
        });

        const token = jwt.sign(
            {
                user_id: user.id,
                username: user.user_name,
                clearance: user.clearance
            },
            process.env.JWT_PVK,
            { expiresIn: "336h" }
        );

        return {
            code: 200,
            message: 'Authentication successful!',
            messageCode: 'AU_2321',
            data: {
                token: token,
                user_name: user.user_name,
                user_id: `${user.id}`,
                clearance: user.clearance,
                pref: {
                    lang: user.lang,
                    theme: user.theme
                }
            }
        } as authUserResponse;
    }
    catch (err) {
        return { ...authFailed, code: 500, message: "There was an error!"} as authUserResponse;
    }

}
