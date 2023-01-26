import { Request } from 'express';
import { Publisher } from '../../../../models/sql/publisher.sql';
import { Merge } from "../../../../types/merge";
import { getClearedUser } from '../../../../util/getClearedUser';
import { getValidationFromError } from '../../../../util/getValidationFromError';

export const addPublisherToGlobalList = async (_obj: any, { name } : {name?: string}, context: Merge<{[prop: string]: any; }, Partial<Request>>) => {
    try {
        try {
            await getClearedUser(context.jwtAuth);
        }
        catch (err) {
            return err;
        }

        const matchingDbArtist = await Publisher.findOne({
            where: { name: name?.toLowerCase() },
        });
        if (matchingDbArtist) {
            return {
                code: 204,
                message: "Artist already present!",
            };
        }

        await Publisher.create({ name: name });

        return {
            code: 201,
            message: "Created!",
        };
    } catch (err) {
        return {
            code: 500,
            message: "Operation unsuccessful!",
            validationError: getValidationFromError(err)
        };
    }
}