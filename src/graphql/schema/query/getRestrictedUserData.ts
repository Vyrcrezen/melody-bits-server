import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType } from 'graphql';
import { getRestrictedUserData as getUserRestrictedDataResolver } from '../../resolver/query/getRestrictedUserData';

const getRestrictedUserDataGt = new GraphQLObjectType({
    name: 'getRestrictedUserDataSchema',
    fields: {
        placeholder: {type: GraphQLString}
    }
});

export const getRestrictedUserData: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: getRestrictedUserDataGt,
    args: {
        placeholder: { type: GraphQLString }
    },
    resolve: getUserRestrictedDataResolver
};
