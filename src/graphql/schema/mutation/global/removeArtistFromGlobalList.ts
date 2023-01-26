import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType } from 'graphql';
import { removeArtistFromGlobalList as removeArtistFromGlobalListResolver } from '../../../resolver/mutation/global/removeArtistFromGlobalList';

const removeArtistFromGlobalListGt = new GraphQLObjectType({
    name: 'removeArtistFromGlobalListSchema',
    fields: {
        placeholder: {type: GraphQLString}
    }
});

export const removeArtistFromGlobalList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: removeArtistFromGlobalListGt,
    args: {
        placeholder: { type: GraphQLString }
    },
    resolve: removeArtistFromGlobalListResolver
};
