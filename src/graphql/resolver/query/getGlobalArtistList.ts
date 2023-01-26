import { Request } from 'express';
import { Artist } from '../../../models/sql/artist.sql';
import { Merge } from "../../../types/merge";

export const getGlobalArtistList = async (_obj: any, _arg: { [prop: string]: any; }, _context: Merge<{[prop: string]: any; }, Partial<Request>>) => {

    let artistList: Artist[] | undefined;

    try {
        artistList = await Artist.findAll();
    }
    catch (err) {
        return {
            code: 500,
            message: 'Couldn\'t retrieve the artists list!'
        };
    }

    return {
        code: 200,
        message: 'Successful',
        data: artistList.map(artistItem => {
            return {
                id: artistItem.id,
                name: artistItem.name
            }
        })
    };
}