import { GraphQLFieldConfig, GraphQLInt } from 'graphql';
import { editUserClearance as editUserClearanceResolver } from '../../../resolver/mutation/userAccount/editUserClearance';
import { MutationResponseGt } from '../../types/mutationResponse';

export const editUserClearance: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        target_user_id: { type: GraphQLInt },
        clearance: { type: GraphQLInt }
    },
    resolve: editUserClearanceResolver
};
