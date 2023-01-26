import { buildSchema } from 'graphql';

export const graphqlSchema = buildSchema(`
    type MutationResponse {
        code: Float!
        message: String!
    }

    type User {
        id: ID!
        user_name: String!
        hash_id: Float!
        user_email: String!
        user_password: String!
        clearance: Float
        registration_time: String!
        last_online: String!
    }

    type UserPublic {
        user_name: String!
        registration_time: String!
        last_online: String!
    }

    type Artist {
        id: ID!
        name: String!
    }

    type RecordLabel {
        id: ID!
        name: String!
    }

    type Publisher {
        id: ID!
        name: String!
    }

    type MusicData {
        id: ID!
        upload_time: String
        uploader: UserPublic!
        edit_time: String
        editor: UserPublic
        title: String!
        artist: Artist!
        record_label: RecordLabel
        publisher: Publisher
        album: String
        link: String!
        num_played: Float
        avg_rating: Float
        aws_root: String
        music_size: Float
    }

    type AuthData {
        code: Float!
        token: String!
        user_name: String!
        message: String
    }

    input MusicInputData {
        uploader_id: ID!
        title: String!
        artist: String!
        record_label: String
        publisher: String
        album: String
        link: String!
    }

    input UserRegistrationData {
        user_name: String!
        user_email: String!
        user_password: String!
    }

    type RootQuery {
        getMusicData: [MusicData!]!
        authUser(email: String!, password: String!): AuthData
    }

    type RootMutation {
        postMusic(musicData: MusicInputData): MutationResponse!
        registerUser(userData: UserRegistrationData): MutationResponse!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);