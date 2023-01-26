import { GraphQLInputObjectType, GraphQLList, GraphQLString } from 'graphql';

export const ModifyItemTagsGt = new GraphQLInputObjectType({
    name: 'ModifyItemTags',
    fields: {
        add: {type: GraphQLList(GraphQLString)},
        remove: {type: GraphQLList(GraphQLString)},
    }
});