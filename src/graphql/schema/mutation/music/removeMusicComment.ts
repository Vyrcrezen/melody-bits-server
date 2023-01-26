import { GraphQLFieldConfig, GraphQLID } from 'graphql';
import { removeMusicComment as removeMusicCommentResolver } from '../../../resolver/mutation/music/removeMusicComment';
import { MutationResponseGt } from '../../types/mutationResponse';

export const removeMusicComment: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        commentID: { type: GraphQLID }
    },
    resolve: removeMusicCommentResolver
};
