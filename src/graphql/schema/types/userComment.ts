import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export interface UserComment {
    user_name?: string,
    user_id?: number,
    registration_time?: Date,
    last_online?: Date,
    commentText?: string,
    created_at?: Date,
    updated_at?: Date,
}

export const UserCommentGt = new GraphQLObjectType({
    name: 'UserComment',
    fields: {
        user_name: {type: GraphQLString},
        user_id: { type: GraphQLID },
        registration_time: {type: GraphQLString},
        commentText: { type: GraphQLString },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString },
        deleted_at: { type: GraphQLString },
    }
});