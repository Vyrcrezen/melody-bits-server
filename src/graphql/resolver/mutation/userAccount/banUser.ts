import { Request } from "express";
import { UserAccount } from "../../../../models/sql/user_account.sql";
import { UserBio } from "../../../../models/sql/userBio.sql";
import { IsDate, IsInt, IsOptional, validate } from "class-validator";
import { getValidationFromError } from "../../../../util/getValidationFromError";

class banUserArg {
    @IsInt()
    target_user_id?: number;

    @IsDate()
    @IsOptional()
    expiryDate?: Date;

    constructor(target_user_id?: number, expiryDate?: string) {
        this.target_user_id = target_user_id;

        if (expiryDate) {
            this.expiryDate = new Date(expiryDate);
            console.log(expiryDate);
        }
    }
}

export const banUser = async (
    _obj: any,
    { target_user_id, expiryDate}: { target_user_id?: number, expiryDate?: string},
    context: Partial<Request>
) => {
    try {

        const validationResult = await validate(new banUserArg(target_user_id, expiryDate));

        if (validationResult.length > 0) {
            return {
                code: 400,
                message: 'Invalid arguments!',
                validationError: getValidationFromError(validationResult),

            }
        }

        if (!context.jwtAuth?.user_id) {
            return {
                code: 401,
                message: 'No logged in!'
            };
        }

        if (!target_user_id) {
            return {
                code: 400,
                message: 'Invalid argument'
            }
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
        if (!initiator?.clearance) {
            return {
                code: 400,
                message: 'Corrupt web-token. Please login in again!'
            };
        }

        const targetUser = await UserAccount.findByPk(target_user_id);

        if (  (initiator.clearance > 2 || 1 > initiator.clearance)
            || (initiator.clearance === 2 && (targetUser?.clearance === 1 || targetUser?.clearance === 2))
        ) {
            return {
                code: 401,
                message: 'You are not authorized to update clearance level!'
            }
        }

        await targetUser?.update({
            is_banned: true,
            banned_until: expiryDate ? expiryDate : null,
            banned_by_id: initiator.id
        })

        return {
            code: 200,
            message: "User account updated!",
        };
    } catch (err) {
        return {
            code: 500,
            message: "Operation failed"
        };
    }
};
