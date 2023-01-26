import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType, GraphQLFloat, GraphQLList } from 'graphql';
import { getGlobalRecordLabelList as getGlobalRecordLabelListResolver } from '../../resolver/query/getGlobalRecordLabelList';
import { RecordLabelGt } from '../types/recordLabel';

const getGlobalRecordLabelListGt = new GraphQLObjectType({
    name: 'getGlobalRecordLabelListSchema',
    fields: {
        code: { type: GraphQLFloat },
        data: {type: GraphQLList(RecordLabelGt)},
        message: { type: GraphQLString },
        messageCode: {type: GraphQLString}
    }
});

export const getGlobalRecordLabelList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: getGlobalRecordLabelListGt,
    resolve: getGlobalRecordLabelListResolver
};
