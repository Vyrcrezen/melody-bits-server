import { GraphQLFieldConfig, GraphQLID } from "graphql";
import { GraphqlReturnTemplate } from "../../types/GraphqlReturnTemplate";
import { removeFavoritePlaylist as removeFavoritePlaylistResolver } from '../../../resolver/mutation/userAccount/removeFavoritePlaylist';

export const removeFavoritePlaylist: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('removeFavoritePlaylistReturn'),
    args: {
        playlistId: { type: GraphQLID }
    },
    resolve: removeFavoritePlaylistResolver,
};