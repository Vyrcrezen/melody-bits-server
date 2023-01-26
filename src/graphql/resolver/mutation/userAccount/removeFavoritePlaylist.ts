import { Merge } from "../../../../types/merge"

export const removeFavoritePlaylist = async (_obj: any, { playlistId }: { playlistId?: number }, _context: Merge<{ [prop: string]: any }, Partial<Request>>) => {

    console.log(playlistId);

    return {
        code: 500,
        message: 'Operation failed'
    }
}