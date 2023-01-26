import { Request } from 'express';
import { Music } from '../../../../models/sql/music.sql';
import { Merge } from "../../../../types/merge"

export const increaseMusicPlayed = async (_obj: any, { musicId }: { musicId?: number }, _context: Merge<{ [prop: string]: any }, Partial<Request>>) => {

    try {
        const music = await Music.findByPk(musicId);

        if (!music) {
            return {
                code: 400,
                message: `No music with this id: ${musicId}`
            }
        }

        await music.update({
            num_played: (music.num_played ?? 0) + 1
        });

        return {
            code: 200,
            message: 'MD_040;Music played count succesfully increased!',
            messageCode: 'MD_040',
            data: `${music.num_played}`
        }

    }
    catch (err) {
        return {
            code: 500,
            message: 'Operation failed'
        }
    }

}