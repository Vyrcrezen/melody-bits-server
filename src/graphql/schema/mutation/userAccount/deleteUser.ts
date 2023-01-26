import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType } from 'graphql';
import { deleteUser as deleteUserResolver } from '../../../resolver/mutation/userAccount/deleteUser';

const deleteUserGt = new GraphQLObjectType({
    name: 'deleteUserSchema',
    fields: {
        placeholder: {type: GraphQLString}
    }
});

export const deleteUser: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: deleteUserGt,
    args: {
        placeholder: { type: GraphQLString }
    },
    resolve: deleteUserResolver
};
