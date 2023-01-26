import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

const PostedCommentsGt = new GraphQLObjectType({
    name: 'PostedComments',
    fields: {
        music_id: { type: GraphQLID },
        comment_text: { type: GraphQLString },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString }
    }
});

export const PublicUserGt = new GraphQLObjectType({
    name: 'PublicUser',
    fields: {
        user_name: {type: GraphQLString},
        user_id: {type: GraphQLID},
        user_email: {type: GraphQLString},
        clearance: {type: GraphQLInt},
        hashId: {type: GraphQLInt},
        registration_time: {type: GraphQLString},
        last_online: {type: GraphQLString},
        uploads: {type: GraphQLInt},
        favorites: {type: GraphQLInt},
        comment_num: {type: GraphQLInt},
        comments: { type: GraphQLList(PostedCommentsGt) },
        bio: {type: GraphQLString},
    }
});