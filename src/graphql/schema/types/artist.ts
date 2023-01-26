import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const ArtistGt = new GraphQLObjectType({
    name: 'Artist',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    }
});