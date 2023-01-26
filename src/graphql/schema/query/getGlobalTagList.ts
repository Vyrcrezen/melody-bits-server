import { GraphQLString, GraphQLFieldConfig, GraphQLObjectType, GraphQLFloat, GraphQLList } from 'graphql';
import { getGlobalTagList as getGlobalTagListResolver } from '../../resolver/query/getGlobalTagList';
import { TagGt } from '../types/tag';


const getGlobalTagListGt = new GraphQLObjectType({
    name: 'getGlobalTagListSchema',
    fields: {
        code: { type: GraphQLFloat },
        data: {type: GraphQLList(TagGt)},
        message: { type: GraphQLString },
        messageCode: {type: GraphQLString}
    }
});

export const getGlobalTagList: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: getGlobalTagListGt,
    resolve: getGlobalTagListResolver
};
