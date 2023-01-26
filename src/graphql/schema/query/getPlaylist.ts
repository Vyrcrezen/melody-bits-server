import { GraphQLFieldConfig, GraphQLID, GraphQLString } from "graphql";
import { getPlaylist as getPlaylistResolver } from '../../resolver/query/getPlaylist';
import { GraphqlReturnTemplate } from "../types/GraphqlReturnTemplate";

export const getPlaylist: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('getPlaylistReturn'),
    args: {
        playlistId: { type: GraphQLID },
        playlistName: { type: GraphQLString }
    },
    resolve: getPlaylistResolver,
};