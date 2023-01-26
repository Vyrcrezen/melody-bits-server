import { GraphQLBoolean, GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { getMusicData as getMusicDataResolver } from '../../resolver/query/getMusicData';
import { GraphqlReturnTemplate } from '../types/GraphqlReturnTemplate';
import { MusicDataGt } from '../types/musicData';

const getMusicDataItemOptions = new GraphQLInputObjectType({
    name: 'getMusicDataItemOptions',
    fields: {
        relAnd: {type: GraphQLList(GraphQLBoolean)},
    }
});

const getMusicDataArgs: GraphQLFieldConfigArgumentMap = {

    musicTitle: { type: GraphQLString },
    artistName: { type: GraphQLString },
    recordLabelName: { type: GraphQLString },
    publisherName: { type: GraphQLString },
    uploaderName: { type: GraphQLString },

    tags: {
        type: new GraphQLInputObjectType({
            name: "getMusicTagArg",
            fields: {
                values: { type: GraphQLList(GraphQLString) },
                Options: { type: getMusicDataItemOptions }
            },
        }),
    },

    uploadDateMin: { type: GraphQLString },
    uploadDateMax: { type: GraphQLString },

    playedMin: { type: GraphQLInt },
    playedMax: { type: GraphQLInt },

    ratingMin: { type: GraphQLFloat },
    ratingMax: { type: GraphQLFloat },

    isFavorite: {type: GraphQLBoolean },
    isPendingApproval: {type: GraphQLBoolean},
    approvalStatusList: { type: GraphQLList(GraphQLInt) },

    orderByColumn: { type: GraphQLString },
    orderByDirection: { type: GraphQLString },

    pageNum: { type: GraphQLInt }
};

export const getMusicData: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('getMusicDataReturn', MusicDataGt),
    args: getMusicDataArgs,
    resolve: getMusicDataResolver,
};
