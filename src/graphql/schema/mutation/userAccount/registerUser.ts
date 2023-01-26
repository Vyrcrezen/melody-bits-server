import { GraphQLString, GraphQLFieldConfigArgumentMap, GraphQLFieldConfig } from 'graphql';
import { registerUserResolver } from '../../../resolver/mutation/userAccount/registerUser';
import { MutationResponseGt } from '../../types/mutationResponse';

export const RegisterUserGam: GraphQLFieldConfigArgumentMap = {
    user_name: {type: GraphQLString},
    user_email: {type: GraphQLString},
    user_password: {type: GraphQLString}
};

export const registerUser: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: RegisterUserGam,
    resolve: registerUserResolver
};