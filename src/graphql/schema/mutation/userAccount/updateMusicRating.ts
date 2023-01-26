import { GraphQLFieldConfig, GraphQLFloat, GraphQLInt } from 'graphql';
import { updateMusicRating as updateMusicRatingResolver } from '../../../resolver/mutation/userAccount/updateMusicRating';
import { MutationResponseGt } from '../../types/mutationResponse';

export const updateMusicRating: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: { musicId: { type: GraphQLFloat}, ratingScore: { type: GraphQLInt }},
    resolve: updateMusicRatingResolver,
};