import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const RecordLabelGt = new GraphQLObjectType({
    name: 'RecordLabel',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    }
});