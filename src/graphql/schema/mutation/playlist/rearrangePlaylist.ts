import { GraphQLFieldConfig, GraphQLID } from "graphql";
import { GraphqlReturnTemplate } from "../../types/GraphqlReturnTemplate";
import { rearrangePlaylist as rearrangePlaylistResolver } from '../../../resolver/mutation/playlist/rearrangePlaylist';

export const rearrangePlaylist: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('rearrangePlaylistReturn'),
    args: {
        playlistId: { type: GraphQLID }
    },
    resolve: rearrangePlaylistResolver,
};