import { GraphQLBoolean, GraphQLFieldConfig, GraphQLFloat } from 'graphql';
import { updateFavoriteMusic as updateFavoriteMusicResolver } from '../../../resolver/mutation/userAccount/updateFavoriteMusic';
import { MutationResponseGt } from '../../types/mutationResponse';

export const updateFavoriteMusic: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: { musicId: { type: GraphQLFloat}, isFavorite: { type: GraphQLBoolean }},
    resolve: updateFavoriteMusicResolver,
};