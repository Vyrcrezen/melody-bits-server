import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType, GraphQLList, GraphQLFloat } from 'graphql';
import { getGlobalArtistList as getGlobalArtistListResolver } from '../../resolver/query/getGlobalArtistList';
import { ArtistGt } from '../types/artist';

const getGlobalArtistListGt = new GraphQLObjectType({
    name: 'getGlobalArtistListSchema',
    fields: {
        code: { type: GraphQLFloat },
        data: {type: GraphQLList(ArtistGt)},
        message: { type: GraphQLString },
        messageCode: {type: GraphQLString}
    }
});

export const getGlobalArtistList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: getGlobalArtistListGt,
    resolve: getGlobalArtistListResolver
};
