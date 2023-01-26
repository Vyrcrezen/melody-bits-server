import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType } from 'graphql';
import { removeTagFromGlobalList as removeTagFromGlobalListResolver } from '../../../resolver/mutation/global/removeTagFromGlobalList';

const removeTagFromGlobalListGt = new GraphQLObjectType({
    name: 'removeTagFromGlobalListSchema',
    fields: {
        placeholder: {type: GraphQLString}
    }
});

export const removeTagFromGlobalList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: removeTagFromGlobalListGt,
    args: {
        placeholder: { type: GraphQLString }
    },
    resolve: removeTagFromGlobalListResolver
};
