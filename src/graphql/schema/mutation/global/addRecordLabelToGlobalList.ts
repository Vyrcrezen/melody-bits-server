import { GraphQLString, GraphQLFieldConfig } from 'graphql';
import { addRecordLabelToGlobalList as addRecordLabelToGlobalListResolver } from '../../../resolver/mutation/global/addRecordLabelToGlobalList';
import { MutationResponseGt } from '../../types/mutationResponse';

export const addRecordLabelToGlobalList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        name: { type: GraphQLString }
    },
    resolve: addRecordLabelToGlobalListResolver
};
