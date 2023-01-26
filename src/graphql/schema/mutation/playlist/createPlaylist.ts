import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";
import { createPlaylist as createPlaylistResolver } from '../../../resolver/mutation/playlist/createPlaylist';
import { GraphqlReturnTemplate } from "../../types/GraphqlReturnTemplate";

export const createPlaylist: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('createPlaylistReturn'),
    args: {
        playlistName: { type: GraphQLString },
        playlistTags: { type: GraphQLList(GraphQLString) }
    },
    resolve: createPlaylistResolver,
};