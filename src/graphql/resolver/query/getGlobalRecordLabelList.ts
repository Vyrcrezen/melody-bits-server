import { Request } from 'express';
import { RecordLabel } from '../../../models/sql/record_label.sql';
import { Merge } from "../../../types/merge";

export const getGlobalRecordLabelList = async (_obj: any, _arg: { [prop: string]: any; }, _context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    let recordLabelList: RecordLabel[] | undefined;

    try {
        recordLabelList = await RecordLabel.findAll();
    }
    catch (err) {
        return {
            code: 500,
            message: 'Couldn\'t retrieve the record label list!'
        };
    }

    return {
        code: 200,
        message: 'Successful',
        data: recordLabelList.map(recordLabelItem => {
            return {
                id: recordLabelItem.id,
                name: recordLabelItem.name
            }
        })
    };
}