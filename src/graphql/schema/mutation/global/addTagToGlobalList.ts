import { GraphQLString, GraphQLFieldConfig } from 'graphql';
import { addTagToGlobalList as addTagToGlobalListResolver } from '../../../resolver/mutation/global/addTagToGlobalList';
import { MutationResponseGt } from '../../types/mutationResponse';

export const addTagToGlobalList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        name: { type: GraphQLString }
    },
    resolve: addTagToGlobalListResolver
};
