import { Sequelize } from 'sequelize-typescript';
import { UserAccount } from '../models/sql/user_account.sql';
import { Artist } from '../models/sql/artist.sql';
import { RecordLabel } from '../models/sql/record_label.sql';
import { Publisher } from '../models/sql/publisher.sql';
import { Music } from '../models/sql/music.sql';
import { config } from 'dotenv';
import { Tag } from '../models/sql/tag.sql';
import { TagPairing } from '../models/sql/tag_pairing.sql';
import { UserFavoriteMusic } from '../models/sql/user_favorite_music.sql';
import { UserBio } from '../models/sql/userBio.sql';
import { UserCommentMusic } from '../models/sql/user_comment_music.sql';
import { Playlist } from '../models/sql/playlist.sql';
import { PlaylistPairing } from '../models/sql/playlist_pairing.sql';
import { UserMusicRating } from '../models/sql/user_music_rating.sql';
import { PlaylistTagPairing } from '../models/sql/playlist_tag_pairing.sql';
import { UserFavoritePlaylist } from '../models/sql/user_favorite_playlist.sql';
import { Post } from '../models/sql/post';
import { Thread } from '../models/sql/thread';
import { UserPostReaction } from '../models/sql/post_reaction';
import { Reaction } from '../models/sql/reaction';
import { UserCommentMusicReaction } from '../models/sql/user_comment_music_reaction';
import { MusicApproval } from '../models/sql/music_approval';

config();

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: "mssql",
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_URL,
    models: [
        Artist,
        RecordLabel,
        Publisher,
        Music,
        UserAccount,
        Tag,
        TagPairing,
        UserFavoriteMusic,
        UserBio,
        UserCommentMusic,
        Playlist,
        PlaylistPairing,
        PlaylistTagPairing,
        UserFavoritePlaylist,
        UserMusicRating,
        UserCommentMusicReaction,
        Post,
        Thread,
        UserPostReaction,
        Reaction,
        MusicApproval
    ],
});
