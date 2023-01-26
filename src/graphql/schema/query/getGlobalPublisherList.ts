import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType, GraphQLFloat, GraphQLList } from 'graphql';
import { getGlobalPublisherList as getGlobalPublisherListResolver } from '../../resolver/query/getGlobalPublisherList';
import { PublisherGt } from '../types/publisher';

const getGlobalPublisherListGt = new GraphQLObjectType({
    name: 'getGlobalPublisherListSchema',
    fields: {
        code: { type: GraphQLFloat },
        data: {type: GraphQLList(PublisherGt)},
        message: { type: GraphQLString },
        messageCode: {type: GraphQLString}
    }
});

export const getGlobalPublisherList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: getGlobalPublisherListGt,
    resolve: getGlobalPublisherListResolver
};
