import { GraphQLFieldConfig, GraphQLID } from "graphql";
import { GraphqlGenericReturn } from "../../types/GraphqlReturnTemplate";
import { addMusicToPlaylist as addMusicToPlaylistResolver } from '../../../resolver/mutation/playlist/addMusicToPlaylist';

export const addMusicToPlaylist: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlGenericReturn,
    args: {
        musicId: { type: GraphQLID }
    },
    resolve: addMusicToPlaylistResolver,
};