import { Table, Column, Model, ForeignKey, UpdatedAt, BelongsTo, BelongsToMany, CreatedAt, HasMany, DeletedAt, Index, IsUrl, IsNumeric, IsDate, Length } from 'sequelize-typescript';
import { Artist } from './artist.sql';
import { Playlist } from './playlist.sql';
import { PlaylistPairing } from './playlist_pairing.sql';
import { Publisher } from './publisher.sql';
import { RecordLabel } from './record_label.sql';
import { Tag } from './tag.sql';
import { TagPairing } from './tag_pairing.sql';
import { UserCommentMusic } from './user_comment_music.sql';
import { UserAccount } from './user_account.sql';
import { UserFavoriteMusic } from './user_favorite_music.sql';
import { UserMusicRating } from './user_music_rating.sql';
import { MusicApproval } from './music_approval';

@Table({
    tableName: 'music',
    timestamps: true,
    underscored: true,
    paranoid: true
})
export class Music extends Model {

    @BelongsToMany(() => Tag, () => TagPairing)
    tags?: Tag[];

    @BelongsToMany(() => UserAccount, () => UserFavoriteMusic)
    favored_by?: UserAccount[];

    @IsNumeric
    @Column({
        allowNull: false
    })
    @ForeignKey(() => UserAccount)
    uploader_id?: number;

    @BelongsTo(() => UserAccount, 'uploader_id')
    uploader?: UserAccount;

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
    @DeletedAt
    deleted_at?: Date;

    @IsNumeric
    @Column
    @ForeignKey(() => UserAccount)
    editor_id?: number;

    @BelongsTo(() => UserAccount, 'editor_id')
    editor?: UserAccount;

    @Length({min: 2, max: 128})
    @Column({
        allowNull: false
    })
    @Index
    title?: string;

    @IsNumeric
    @Column({
        allowNull: false
    })
    @Index
    @ForeignKey(() => Artist)
    artist_id?: number;

    @BelongsTo(() => Artist)
    artist?: Artist;

    @IsNumeric
    @Column
    @ForeignKey(() => RecordLabel)
    record_label_id?: number;

    @BelongsTo(() => RecordLabel)
    record_label?: RecordLabel;

    @IsNumeric
    @Column
    @ForeignKey(() => Publisher)
    publisher_id?: number;

    @BelongsTo(() => Publisher)
    publisher?: Publisher;

    @Length({min: 2, max: 128})
    @Column
    album?: string;

    @IsUrl
    @Column({
        allowNull: false,
    })
    link?: string;

    @IsNumeric
    @Column({
        allowNull: false
    })
    num_played?: number;

    @IsNumeric
    @Column
    num_comments?: number;

    @IsNumeric
    @Column
    @Index
    avg_rating?: number;

    @IsNumeric
    @Column
    ratings_num?: number;

    @Column({
        allowNull: false
    })
    aws_root?: string;

    @IsNumeric
    @Column({
        allowNull: false
    })
    music_size?: number;

    @IsNumeric
    @Column
    @ForeignKey(() => UserAccount)
    approver_id?: number;

    @BelongsTo(() => UserAccount, 'approver_id')
    approver?: UserAccount;

    // @IsDate
    // @Column
    // approval_time?: Date;

    @HasMany(() => UserCommentMusic, 'music_id')
    comment?: UserCommentMusic[];

    @BelongsToMany(() => Playlist, () => PlaylistPairing)
    playlist?: Playlist[];

    @HasMany(() => UserMusicRating, 'music_id')
    ratings?: UserMusicRating[];

    @HasMany(() => MusicApproval, 'music_id')
    approvals?: MusicApproval[];

}

