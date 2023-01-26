import { GraphQLObjectType, GraphQLString } from 'graphql';

export const UserAccountGt = new GraphQLObjectType({
    name: "UserAccount",
    fields: {
        user_name: { type: GraphQLString },
        user_email: { type: GraphQLString },
        user_password: { type: GraphQLString },
        user_bio: { type: GraphQLString },
    },
});

// export const UserAccountGt = {
//     user_name: {type: GraphQLString},
//     user_email: {type: GraphQLString},
//     user_password: {type: GraphQLString},
//     clearance: {type: GraphQLInt},
//     user_bio: {type: GraphQLString}
// };
