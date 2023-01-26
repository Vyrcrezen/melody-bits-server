import { Request } from 'express';
import { Tag } from '../../../../models/sql/tag.sql';
import { Merge } from "../../../../types/merge";
import { getClearedUser } from '../../../../util/getClearedUser';

export const removeTagFromGlobalList = async (_obj: any, { name } : {name?: string}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    try {
        try {
            await getClearedUser(context.jwtAuth);
        }
        catch (err) {
            return err;
        }

        // See if the tag is user by music entries

        await Tag.destroy({ where: {name: name} });

        return {
            code: 201,
            message: "Tag deleted!",
        };
    } catch (err) {
        return {
            code: 500,
            message: "Operation unsuccessful!",
        };
    }
}