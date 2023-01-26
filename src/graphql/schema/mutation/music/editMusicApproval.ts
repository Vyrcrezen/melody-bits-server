import { GraphQLFieldConfig, GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { GraphqlGenericReturn } from "../../types/GraphqlReturnTemplate";
import { editMusicApproval as editMusicApprovalResolver } from '../../../resolver/mutation/music/editMusicApproval';

export const editMusicApproval: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlGenericReturn,
    args: {
        musicId: { type: GraphQLID },
        status: { type: GraphQLInt },
        message: { type: GraphQLString }
    },
    resolve: editMusicApprovalResolver,
};