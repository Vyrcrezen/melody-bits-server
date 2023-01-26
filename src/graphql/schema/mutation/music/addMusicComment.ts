import { GraphQLString, GraphQLFieldConfig, GraphQLID } from 'graphql';
import { addMusicComment as addMusicCommentResolver } from '../../../resolver/mutation/music/addMusicComment';
import { MutationResponseGt } from '../../types/mutationResponse';


export const addMusicComment: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        musicId: { type: GraphQLID },
        commentText: { type: GraphQLString }
    },
    resolve: addMusicCommentResolver
};
