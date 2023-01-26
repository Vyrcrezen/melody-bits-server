import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType } from 'graphql';
import { removePublisherFromGlobalList as removePublisherFromGlobalListResolver } from '../../../resolver/mutation/global/removePublisherFromGlobalList';

const removePublisherFromGlobalListGt = new GraphQLObjectType({
    name: 'removePublisherFromGlobalListSchema',
    fields: {
        placeholder: {type: GraphQLString}
    }
});

export const removePublisherFromGlobalList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: removePublisherFromGlobalListGt,
    args: {
        placeholder: { type: GraphQLString }
    },
    resolve: removePublisherFromGlobalListResolver
};
