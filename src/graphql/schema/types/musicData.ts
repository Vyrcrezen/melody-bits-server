import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } from 'graphql';
import { ArtistGt } from './artist';
import { PublicUserGt } from './publicUser';
import { PublisherGt } from './publisher';
import { RecordLabelGt } from './recordLabel';
import { TagGt } from './tag';
import { UserCommentGt } from './userComment';

const MusicApprovalDataGt = new GraphQLObjectType({
    name: 'MusicApprovalData',
    fields: {
        message: { type: GraphQLString},
        status: { type: GraphQLString},
        approval_time: { type: GraphQLString}
    }
});

const MusicCardDataGt = new GraphQLObjectType({
    name: 'MusicCardData',
    fields: {
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        uploader: {type: PublicUserGt},
        updated_at: {type: GraphQLString},
        editor: {type: PublicUserGt},
        title: {type: GraphQLString},
        tags: { type: GraphQLList(TagGt) },
        artist: {type: ArtistGt},
        record_label: {type: RecordLabelGt},
        publisher: {type: PublisherGt},
        album: {type: GraphQLString},
        link: {type: GraphQLString},
        num_played: {type: GraphQLFloat},
        avg_rating: {type: GraphQLFloat},
        ratings_num: {type: GraphQLFloat},
        user_rating: {type: GraphQLFloat},
        aws_root: {type: GraphQLString},
        music_size: {type: GraphQLFloat},
        comments: { type: GraphQLList(UserCommentGt) },
        is_favorite: { type: GraphQLBoolean },
        approval: { type: MusicApprovalDataGt }
    }
});

const MusicPaginationDataGt = new GraphQLObjectType({
    name: 'MusicPaginationData',
    fields: {
        totalCount: { type: GraphQLInt},
        offset: { type: GraphQLInt},
        limit: { type: GraphQLInt}
    }
});



export const MusicDataGt = new GraphQLObjectType({
    name: 'MusicData',
    fields: {
        paginationData: { type: MusicPaginationDataGt },
        musicData: { type: GraphQLList(MusicCardDataGt) }
    }
});

