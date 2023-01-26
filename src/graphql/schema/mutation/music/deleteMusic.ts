import { GraphQLFieldConfig, GraphQLInt } from 'graphql';
import { deleteMusic as deleteMusicResolver } from '../../../resolver/mutation/music/deleteMusic';
import { MutationResponseGt } from '../../types/mutationResponse';

export const deleteMusic: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        musicId: { type: GraphQLInt }
    },
    resolve: deleteMusicResolver
};
