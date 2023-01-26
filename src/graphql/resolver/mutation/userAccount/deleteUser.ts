import { Request } from 'express';
import { Merge } from "../../../../types/merge";

export const deleteUser = async (_obj: any, { placeholder } : {placeholder?: string}, _context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    console.log(placeholder);

    return {
        code: 201,
        placeholder: 'Created!'
    };
}