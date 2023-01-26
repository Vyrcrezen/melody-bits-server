import { GraphQLFieldConfig, GraphQLInt } from 'graphql';
import { unbanUser as unbanUserResolver } from '../../../resolver/mutation/userAccount/unbanUser';
import { MutationResponseGt } from '../../types/mutationResponse';

export const unbanUser: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        target_user_id: { type: GraphQLInt },
    },
    resolve: unbanUserResolver
};
