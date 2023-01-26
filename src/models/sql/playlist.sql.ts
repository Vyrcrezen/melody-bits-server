import { BelongsTo, BelongsToMany, BelongsToManyOptions, Column, CreatedAt, DeletedAt, ForeignKey, IsDate, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Music } from "./music.sql";
import { PlaylistPairing } from "./playlist_pairing.sql";
import { PlaylistTagPairing } from "./playlist_tag_pairing.sql";
import { Tag } from "./tag.sql";
import { UserAccount } from "./user_account.sql";
import { UserFavoritePlaylist } from "./user_favorite_playlist.sql";

@Table({
    tableName: 'playlist',
    timestamps: true,
    underscored: true,
    paranoid: true
})
export class Playlist extends Model {
    @Column
    name?: string;

    @Column
    @ForeignKey(() => UserAccount)
    creator_id?: number;

    @BelongsTo(() => UserAccount, 'creator_id')
    creator?: UserAccount[];

    // @BelongsToMany(() => UserAccount, () => UserFavoritePlaylist)
    // favored_by?: UserAccount[];

    @BelongsToMany(() => UserAccount, {
        through: () => UserFavoritePlaylist,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    } as BelongsToManyOptions<UserFavoritePlaylist, UserFavoritePlaylist>)
    favored_by?: UserAccount[];

    @BelongsToMany(() => Music, () => PlaylistPairing)
    music?: Music[];

    @BelongsToMany(() => Tag, () => PlaylistTagPairing)
    tags?: Tag[];

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
}
