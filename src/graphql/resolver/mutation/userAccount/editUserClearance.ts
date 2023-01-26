import { Request } from "express";
import { UserAccount } from "../../../../models/sql/user_account.sql";
import { UserBio } from "../../../../models/sql/userBio.sql";

export const editUserClearance = async (
    _obj: any,
    { target_user_id, clearance}: { target_user_id?: number, clearance?: number},
    context: Partial<Request>
) => {
    try {
        console.log(context.jwtAuth)

        if (!context.jwtAuth?.user_id) {
            return {
                code: 401,
                message: 'You need to be logged in to edit your data!'
            };
        }

        if (!target_user_id || !clearance) {
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

        await initiator?.update({
            last_online: new Date()
        });

        console.log(initiator);

        const targetUser = await UserAccount.findByPk(target_user_id);

        if (  (initiator.clearance > 2 || 1 > initiator.clearance)
            || (initiator.clearance === 2 && ( clearance <= 1 || clearance > 7 ))
            || (initiator.clearance === 2 && (targetUser?.clearance === 1 || targetUser?.clearance === 2))
        ) {
            return {
                code: 401,
                message: 'You are not authorized to update clearance level!'
            }
        }

        await targetUser?.update({ clearance: clearance })

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
