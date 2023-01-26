import { GraphQLFieldConfig, GraphQLID, GraphQLString } from 'graphql';
import { editMusicData as editMusicDataResolver } from '../../../resolver/mutation/music/editMusicData';
import { ModifyItemTagsGt } from '../../types/modifyItemTags';
import { MutationResponseGt } from '../../types/mutationResponse';

export const editMusicData: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: MutationResponseGt,
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        artistName: { type: GraphQLString },
        recordLabelName: { type: GraphQLString },
        publisherName: { type: GraphQLString },
        link: { type: GraphQLString },
        tags: { type: ModifyItemTagsGt }
    },
    resolve: editMusicDataResolver
};
