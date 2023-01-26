import { UserAccount } from "../models/sql/user_account.sql";
/**
 * @throws { code: number, message: string }
 * @param jwtAuth
 * @param minClearance This is the lower value, usually 2
 * @param maxClearance Should usually be 1
 * @returns
 */
export async function getClearedUser(jwtAuth: JwtAuth | undefined, clearedId?: number, minClearance: number = 2, maxClearance: number = 1) {
    if (!jwtAuth) {
        throw {
            code: 401,
            message: "Unauthorized! Not logged in!",
        };
    }

    const initiator = await UserAccount.findByPk(jwtAuth?.user_id);

    if (!initiator) {
        throw {
            code: 401,
            message: "Unauthorized! User not found!",
        };
    }

    initiator.update({
        last_online: new Date()
    })

    if (!initiator.clearance || (!(minClearance >= initiator.clearance && initiator.clearance >= maxClearance) && jwtAuth?.user_id !== clearedId)
    ) {
        throw {
            code: 401,
            message: "Unauthorized!",
        };
    }

    return initiator;
}
