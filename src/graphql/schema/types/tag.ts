import { GraphQLObjectType, GraphQLString } from "graphql";

export const TagGt = new GraphQLObjectType({
    name: 'tag',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString }
    }
});