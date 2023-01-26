import { GraphQLString, GraphQLFieldConfig, GraphQLID } from 'graphql';
import { editMusicComment as editMusicCommentResolver } from '../../../resolver/mutation/music/editMusicComment';
import { MutationResponseGt } from '../../types/mutationResponse';

export const editMusicComment: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        commentID: { type: GraphQLID },
        commentText: { type: GraphQLString },
    },
    resolve: editMusicCommentResolver
};
