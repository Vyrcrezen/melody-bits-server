import { GraphQLFieldConfig, GraphQLID } from "graphql";
import { GraphqlReturnTemplate } from "../../types/GraphqlReturnTemplate";
import { editPlaylist as editPlaylistResolver } from '../../../resolver/mutation/playlist/editPlaylist';

export const editPlaylist: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('editPlaylistReturn'),
    args: {
        musicId: { type: GraphQLID }
    },
    resolve: editPlaylistResolver,
};