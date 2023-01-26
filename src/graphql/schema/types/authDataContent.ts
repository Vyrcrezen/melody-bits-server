import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const AuthDataPrefGt = new GraphQLObjectType({
    name: 'AuthDataPref',
    fields: {
        lang: {type: GraphQLString},
        theme: {type: GraphQLString}
    }
})

export const AuthDataContentGt = new GraphQLObjectType({
    name: 'AuthDataContent',
    fields: {
        user_name: {type: GraphQLString},
        user_id: {type: GraphQLString},
        token: {type: GraphQLString},
        clearance: {type: GraphQLInt},
        pref: {type: AuthDataPrefGt}
    }
});