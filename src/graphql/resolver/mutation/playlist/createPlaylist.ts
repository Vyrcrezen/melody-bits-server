import { Request } from 'express';
import { Playlist } from '../../../../models/sql/playlist.sql';
import { Tag } from '../../../../models/sql/tag.sql';
import { UserAccount } from '../../../../models/sql/user_account.sql';
import { Merge } from "../../../../types/merge";

export const createPlaylist = async (_obj: any, { playlistName, playlistTags }: { playlistName?: string, playlistTags?: string[] }, context: Merge<{ [prop: string]: any }, Partial<Request>>) => {

    try {
        if (!context.jwtAuth?.user_id) {
            return {
                code: 401,
                message: "Only registered users can create playlists!"
            }
        }

        const user = await UserAccount.findByPk(context.jwtAuth?.user_id);

        const playlist = await user?.$create('playlist', {
            name: playlistName
        }) as Playlist;

        console.log(playlist);

        if (playlistTags) {
            const tagsToAdd: Tag[] = [];

            for (const tagItem of playlistTags) {
                tagsToAdd.push((await Tag.findOrCreate({ where: {name: tagItem} }))[0]);
            }
            await playlist.$set('tags', tagsToAdd.map(tagItem => tagItem.id ) );
        }

    }
    catch (err) {
        return {
            code: 500,
            message: 'Operation failed'
        }
    }

}