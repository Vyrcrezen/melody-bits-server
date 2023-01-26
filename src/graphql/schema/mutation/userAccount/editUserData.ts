import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { editUserData as editUserDataResolver } from '../../../resolver/mutation/userAccount/editUserData';
import { MutationResponseGt } from '../../types/mutationResponse';
// import { UserAccountGt } from '../types/userAccount';

export const editUserData: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        user_name: { type: GraphQLString },
        user_email: { type: GraphQLString },
        user_password: { type: GraphQLString },
        user_bio: { type: GraphQLString }
    },
    resolve: editUserDataResolver
};
