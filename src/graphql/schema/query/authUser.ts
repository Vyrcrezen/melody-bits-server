import { GraphQLString, GraphQLFieldConfig, GraphQLFloat, GraphQLObjectType, GraphQLInt} from 'graphql';
import { authUserResolver } from '../../resolver/query/authUser';
import { AuthDataContentGt } from '../types/authDataContent';

const AuthDataGt = new GraphQLObjectType({
    name: 'authDataSchema',
    fields: {
        code: {type: GraphQLFloat},
        data: {type: AuthDataContentGt},
        message: {type: GraphQLString},
        messageCode: {type: GraphQLInt}
    }
});

export const authUser: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: AuthDataGt,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: authUserResolver
};
