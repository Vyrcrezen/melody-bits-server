import { GraphQLFieldConfig, GraphQLID } from "graphql";
import { GraphqlReturnTemplate } from "../../types/GraphqlReturnTemplate";
import { deletePlaylist as deletePlaylistResolver } from '../../../resolver/mutation/playlist/deletePlaylist';

export const deletePlaylist: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('deletePlaylistReturn'),
    args: {
        playlistId: { type: GraphQLID }
    },
    resolve: deletePlaylistResolver,
};