import { GraphQLString, GraphQLFieldConfig} from 'graphql';
import { addPublisherToGlobalList as addPublisherToGlobalListResolver } from '../../../resolver/mutation/global/addPublisherToGlobalList';
import { MutationResponseGt } from '../../types/mutationResponse';

export const addPublisherToGlobalList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        name: { type: GraphQLString }
    },
    resolve: addPublisherToGlobalListResolver
};
