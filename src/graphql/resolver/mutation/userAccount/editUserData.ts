import { Request } from "express";
import bcrypt from "bcrypt";

import { UserAccount } from "../../../../models/sql/user_account.sql";
import { UserBio } from "../../../../models/sql/userBio.sql";
import { getValidationFromError } from "../../../../util/getValidationFromError";

export const editUserData = async (
    _obj: any,
    userData: {
        user_name?: string,
        user_email?: string,
        user_password?: string,
        user_bio?: string
    },
    context: Partial<Request>
) => {
    try {
        if (!context.jwtAuth?.user_id) {
            return {
                code: 401,
                message: 'You need to be logged in to edit your data!'
            };
        }

        const initiator = await UserAccount.findByPk(context.jwtAuth?.user_id, {
            include: [
                {
                    model: UserBio,
                    as: 'user_bio',
                }
            ]
        });

        // No such user
        if (!initiator) {
            return {
                code: 400,
                message: 'Corrupt web-token. Please login in again!'
            };
        }

        await initiator?.update({
            last_online: new Date()
        });

        if (userData.user_name || userData.user_email || userData.user_password || userData.user_bio) {
            // User wants to update their own data
            if (userData.user_password) {
                initiator.user_password = await bcrypt.hash(userData.user_password as string, 12);
            }

            if (userData.user_name) {
                initiator.user_name = userData.user_name;

                let uniquieUserSignature = false;
                while (!uniquieUserSignature) {
                    initiator.hash_id = (Math.random() * 9999).toFixed(0);

                    const userWithSignature = await UserAccount.findOne({
                        where: { hash_id: initiator.hash_id, user_name: userData.user_name },
                    });

                    if (!userWithSignature) {
                        uniquieUserSignature = true;
                    }
                }
            }

            if (userData.user_email) {
                initiator.user_email = userData.user_email;
            }

            try {
                await initiator.save();
            } catch (err) {
                return {
                    code: 500,
                    message: "Operation failed",
                    validationError: getValidationFromError(err),
                };
            }
        }
        if (userData.user_bio) {
            try {
                if (!initiator.user_bio_id) {
                    await initiator.$create("user_bio", { bio_text: userData.user_bio });
                } else {
                    await UserBio.update(
                        { bio_text: userData.user_bio },
                        {
                            where: { id: initiator.user_bio_id },
                        }
                    );
                }
            } catch (err) {
                return { code: 500, message: "Operation failed" };
            }
        }

        return {
            code: 201,
            message: "User account updated!",
        };
    } catch (err) {
        return {
            code: 500,
            message: "Operation failed"
        };
    }
};
