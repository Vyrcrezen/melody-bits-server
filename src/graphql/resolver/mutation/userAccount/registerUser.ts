import { UserAccount } from "../../../../models/sql/user_account.sql";
import * as bcrypt from 'bcrypt';
import { getValidationFromError } from "../../../../util/getValidationFromError";
import { validatePassword } from "../../../../util/validate/validate";

export const registerUserResolver = async (_obj: any, userData?: Partial<UserAccount>) => {

    try {
        if (!userData) {
            return {
                code: 400,
                message: 'Insufficient arguments!'
            };
        }

        console.log(userData);

        const isEmailTaken = !!(await UserAccount.findOne({ where: { user_email: userData.user_email }}));

        if (isEmailTaken) {
            return {
                code: 400,
                message: 'Email already taken!'
            };
        }

        const pswdValidationResult = await validatePassword(userData.user_password as string);
        if (pswdValidationResult.length > 0) {
            return {
                code: 400,
                message: 'Invalid password',
                validationError: getValidationFromError(pswdValidationResult)

            };
        }

        const partialData: Partial<UserAccount> = {};

        partialData.user_password = await bcrypt.hash(userData.user_password as string, 12);

        let uniquieUserSignature = false;
        while(!uniquieUserSignature) {
            partialData.hash_id = (Math.random() * 9999).toFixed(0);

            const userWithSignature = await UserAccount.findOne({ where: { 'hash_id': partialData.hash_id, 'user_name': userData.user_name } });

            if (!userWithSignature) { uniquieUserSignature = true; }
        }

        partialData.user_name = userData.user_name;
        partialData.user_email = userData.user_email?.toLowerCase();
        partialData.last_online = new Date();
        partialData.clearance = 7;
        partialData.is_banned = false;

        console.log(partialData);

        const newUser = UserAccount.build(partialData);
        await newUser.save();

        return {
            code: 201,
            message: 'Successfully registered! You can now log in.'
        };
    }
    catch (err) {
        return {
            code: 500,
            message: "User registration failed",
            validationError: getValidationFromError(err)
        }
    }
}