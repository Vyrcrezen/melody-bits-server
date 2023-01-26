import { Request } from 'express';
import { Merge } from "../../../../types/merge";

export const removePublisherFromGlobalList = async (_obj: any, { placeholder } : {placeholder?: string}, _context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    console.log(placeholder);

    return {
        code: 501,
        placeholder: 'Not implemented!'
    };
}