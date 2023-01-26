import { GraphQLFieldConfig, GraphQLID } from "graphql";
import { GraphqlReturnTemplate } from "../../types/GraphqlReturnTemplate";
import { addFavoritePlaylist as addFavoritePlaylistResolver } from '../../../resolver/mutation/userAccount/addFavoritePlaylist';

export const addFavoritePlaylist: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('addFavoritePlaylistReturn'),
    args: {
        playlistId: { type: GraphQLID }
    },
    resolve: addFavoritePlaylistResolver,
};