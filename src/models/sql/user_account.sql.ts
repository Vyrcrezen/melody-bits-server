import { IsBoolean, Matches } from 'class-validator';
import { Table, Column, Model, CreatedAt, HasMany, BelongsToMany, Index, ForeignKey, BelongsTo, UpdatedAt, DeletedAt, IsAlphanumeric, IsNumeric, IsEmail, IsDate, Length, BelongsToManyOptions } from 'sequelize-typescript';
import { Music } from './music.sql';
import { Playlist } from './playlist.sql';
import { UserPostReaction } from './post_reaction';
import { UserBio } from './userBio.sql';
import { UserCommentMusic } from './user_comment_music.sql';
import { UserCommentMusicReaction } from './user_comment_music_reaction';
import { UserFavoriteMusic } from './user_favorite_music.sql';
import { UserFavoritePlaylist } from './user_favorite_playlist.sql';
import { UserMusicRating } from './user_music_rating.sql';

@Table({
    tableName: 'user_account',
    timestamps: true,
    underscored: true,
    paranoid: true
})
export class UserAccount extends Model {

    @Matches(/^(?!\p{Zs})(?!.*\p{Zs}$)[\p{L}\p{M}\p{Zs}\d]+$/u, { message: 'AC_003;Username must contain only letters and numbers' })
    @Length({ min: 3, max: 20 })
    @Column({
        allowNull: false
    })
    @Index
    user_name?: string;

    @IsNumeric
    @Column({
        allowNull: false
    })
    hash_id?: string;

    @IsEmail
    @Column({
        allowNull: false
    })
    @Index
    user_email?: string;

    @Column({
        allowNull: false
    })
    user_password?: string;

    @IsNumeric
    @Column({
        allowNull: false
    })
    clearance?: number;

    @IsAlphanumeric
    @Length({ min: 2, max: 4 })
    @Column
    lang?: string;

    @IsAlphanumeric
    @Length({ min: 2, max: 12 })
    @Column
    theme?: string;

    @IsNumeric
    @Column
    upload_num?: number;

    @IsNumeric
    @Column
    favorite_num?: number;

    @IsNumeric
    @Column
    posts_posted?: number;

    @IsNumeric
    @Column
    post_likes_received?: number;

    @IsNumeric
    @Column
    comments_posted?: number;

    @IsDate
    @Column
    @CreatedAt
    created_at?: Date;

    @IsDate
    @Column
    @UpdatedAt
    updated_at?: Date;

    @IsDate
    @Column
    last_online?: Date;

    @IsDate
    @Column
    @DeletedAt
    deleted_at?: Date;

    @HasMany(() => Music, 'uploader_id')
    music_uploaded?: Music[];

    @HasMany(() => Music, 'editor_id')
    music_edited?: Music[];

    @HasMany(() => Music, 'approver_id')
    music_approved?: Music[];

    @BelongsToMany(() => Music, () => UserFavoriteMusic)
    favorite_music?: Music[];

    @BelongsToMany(() => Playlist, {
        through: () => UserFavoritePlaylist,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    } as BelongsToManyOptions<UserFavoritePlaylist, UserFavoritePlaylist>)
    favorite_playlist?: Playlist[];

    // @BelongsToMany(() => Playlist, () => UserFavoritePlaylist)
    // favorite_playlist?: Playlist[];

    @IsDate
    @Column
    upload_timeout?: Date;

    @IsNumeric
    @Column
    @ForeignKey(() => UserBio)
    user_bio_id?: number;

    @BelongsTo(() => UserBio, 'user_bio_id')
    user_bio?: UserBio;

    @HasMany(() => UserCommentMusic, 'user_id')
    comments?: UserCommentMusic[];

    @HasMany(() => Playlist, 'creator_id')
    playlists?: Playlist[];

    @HasMany(() => UserMusicRating, 'user_id')
    ratings?: UserMusicRating[];

    @HasMany(() => UserPostReaction, 'user_id')
    post_reactions?: UserPostReaction[];

    @HasMany(() => UserCommentMusicReaction, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: 'user_id'
    })
    music_comment_reactions?: UserCommentMusicReaction[];

    @IsBoolean()
    @Column({
        allowNull: false
    })
    is_banned?: boolean;

    @IsNumeric
    @Column
    @ForeignKey(() => UserAccount)
    banned_by_id?: number;

    @BelongsTo(() => UserAccount, 'banned_by_id')
    banned_by?: UserAccount;

    @IsDate
    @Column
    banned_until?: Date;
}