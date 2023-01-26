import { GraphQLFieldConfig, GraphQLFloat } from 'graphql';
import { removeFavoriteMusic as removeFavoriteMusicResolver } from '../../../resolver/mutation/userAccount/removeFavoriteMusic';
import { MutationResponseGt } from '../../types/mutationResponse';

export const removeFavoriteMusic: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: { musicId: { type: GraphQLFloat} },
    resolve: removeFavoriteMusicResolver,
};