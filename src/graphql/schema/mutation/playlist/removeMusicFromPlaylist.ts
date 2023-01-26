import { GraphQLFieldConfig, GraphQLID } from "graphql";
import { GraphqlReturnTemplate } from "../../types/GraphqlReturnTemplate";
import { removeMusicToPlaylist as removeMusicToPlaylistResolver } from '../../../resolver/mutation/playlist/removeMusicToPlaylist';

export const removeMusicFromPlaylist: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('removeMusicFromPlaylistReturn'),
    args: {
        musicId: { type: GraphQLID }
    },
    resolve: removeMusicToPlaylistResolver,
};