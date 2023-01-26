import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType, GraphQLFloat } from 'graphql';
import { getUserData as getUserDataResolver } from '../../resolver/query/getUserData';
import { PublicUserGt } from '../types/publicUser';

const getUserDataGt = new GraphQLObjectType({
    name: 'getUserDataSchema',
    fields: {
        code: { type: GraphQLFloat },
        data: {type: PublicUserGt},
        message: { type: GraphQLString },
        messageCode: {type: GraphQLString}
    }
});

export const getUserData: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: getUserDataGt,
    args: {
        user_id: { type: GraphQLString }
    },
    resolve: getUserDataResolver
};
