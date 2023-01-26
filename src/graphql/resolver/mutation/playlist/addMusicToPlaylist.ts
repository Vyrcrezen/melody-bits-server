import { Merge } from "../../../../types/merge"

export const addMusicToPlaylist = async (_obj: any, { musicId }: { musicId?: number }, _context: Merge<{ [prop: string]: any }, Partial<Request>>) => {

    console.log(musicId);

    return {
        code: 500,
        message: 'Operation failed'
    }
}