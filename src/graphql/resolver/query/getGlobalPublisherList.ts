import { Request } from 'express';
import { Publisher } from '../../../models/sql/publisher.sql';
import { Merge } from "../../../types/merge";

export const getGlobalPublisherList = async (_obj: any, _arg: { [prop: string]: any; }, _context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    let publisherList: Publisher[] | undefined;

    try {
        publisherList = await Publisher.findAll();
    }
    catch (err) {
        return {
            code: 500,
            message: 'Couldn\'t retrieve the publishers list!'
        };
    }

    return {
        code: 200,
        message: 'Successful',
        data: publisherList.map(publisherItem => {
            return {
                id: publisherItem.id,
                name: publisherItem.name
            }
        })
    };
}