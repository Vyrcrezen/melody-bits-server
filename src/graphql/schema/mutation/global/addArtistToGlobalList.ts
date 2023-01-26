import { GraphQLString, GraphQLFieldConfig } from 'graphql';
import { addArtistToGlobalList as addArtistToGlobalListResolver } from '../../../resolver/mutation/global/addArtistToGlobalList';
import { MutationResponseGt } from '../../types/mutationResponse';

export const addArtistToGlobalList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        name: { type: GraphQLString }
    },
    resolve: addArtistToGlobalListResolver
};
