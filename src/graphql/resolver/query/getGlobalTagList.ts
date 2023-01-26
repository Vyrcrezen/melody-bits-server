import { Request } from 'express';
import { Tag } from '../../../models/sql/tag.sql';
import { Merge } from "../../../types/merge";

export const getGlobalTagList = async (_obj: any, _arg: { [prop: string]: any; }, _context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    let tagList: Tag[] | undefined;

    try {
        tagList = await Tag.findAll();
    }
    catch (err) {
        return {
            code: 500,
            message: 'Couldn\'t retrieve the tags list!'
        };
    }

    return {
        code: 200,
        message: 'Successful',
        data: tagList.map(tagItem => {
            return {
                id: tagItem.id,
                name: tagItem.name
            }
        })
    };
}