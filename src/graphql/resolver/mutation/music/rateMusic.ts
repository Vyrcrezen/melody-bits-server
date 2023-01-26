import { Merge } from "../../../../types/merge"

export const rateMusic = async (_obj: any, { musicId, ratingScore }: { musicId?: number, ratingScore?: number }, _context: Merge<{ [prop: string]: any }, Partial<Request>>) => {

    console.log(musicId, ratingScore);

    return {
        code: 500,
        message: 'Operation failed'
    }
}