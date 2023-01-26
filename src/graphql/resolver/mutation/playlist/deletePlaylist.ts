import { Request } from 'express';
import { Playlist } from '../../../../models/sql/playlist.sql';
import { Tag } from '../../../../models/sql/tag.sql';
import { UserAccount } from '../../../../models/sql/user_account.sql';
import { Merge } from "../../../../types/merge"

export const deletePlaylist = async (_obj: any, { playlistId }: { playlistId?: number }, context: Merge<{ [prop: string]: any }, Partial<Request>>) => {

    try {
        if (!context.jwtAuth?.user_id) {
            return {
                code: 401,
                message: "Only registered users can create playlists!"
            }
        }

        if (!playlistId) {
            return {
                code: 400,
                message: "Needs a valid playlist id!"
            }
        }

        const user = await UserAccount.findByPk(context.jwtAuth?.user_id);

        try {
            await user?.$remove('playlist', playlistId);
        }
        catch (err) {
            return {
                code: 400,
                message: `No playlist by the given id: ${playlistId}`
            }
        }

        const playlist = await Playlist.findByPk(playlistId) as Playlist;

        const tagIds = await playlist.$get('tags', {
            attributes: ['id']
        }) as Tag[];

        await playlist.$remove('tags', tagIds.map(tagItem => tagItem.id));

        await playlist.destroy({
            force: true
        })

    }
    catch (err) {
        return {
            code: 500,
            message: 'Operation failed'
        }
    }
}