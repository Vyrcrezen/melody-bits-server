import { Merge } from "../../../types/merge"

export const getPlaylist = async (_obj: any, { playlistId, playlistName }: { playlistId?: number, playlistName?: string }, _context: Merge<{ [prop: string]: any }, Partial<Request>>) => {

    console.log(playlistId, playlistName);

    return {
        code: 500,
        message: 'Operation failed'
    }
}