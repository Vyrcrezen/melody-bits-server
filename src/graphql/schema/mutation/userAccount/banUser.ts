import { GraphQLFieldConfig, GraphQLInt, GraphQLString } from 'graphql';
import { banUser as banUserResolver } from '../../../resolver/mutation/userAccount/banUser';
import { MutationResponseGt } from '../../types/mutationResponse';

export const banUser: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        target_user_id: { type: GraphQLInt },
        expiryDate: { type: GraphQLString }
    },
    resolve: banUserResolver
};
