import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType } from 'graphql';
import { removeRecordLabelFromGlobalList as removeRecordLabelFromGlobalListResolver } from '../../../resolver/mutation/global/removeRecordLabelFromGlobalList';

const removeRecordLabelFromGlobalListGt = new GraphQLObjectType({
    name: 'removeRecordLabelFromGlobalListSchema',
    fields: {
        placeholder: {type: GraphQLString}
    }
});

export const removeRecordLabelFromGlobalList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: removeRecordLabelFromGlobalListGt,
    args: {
        placeholder: { type: GraphQLString }
    },
    resolve: removeRecordLabelFromGlobalListResolver
};
