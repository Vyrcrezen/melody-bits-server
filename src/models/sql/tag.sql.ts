import { Table, Column, Model, BelongsToMany, Index, CreatedAt, UpdatedAt, DeletedAt, Length, IsDate } from 'sequelize-typescript';
import { Music } from './music.sql';
import { Playlist } from './playlist.sql';
import { PlaylistTagPairing } from './playlist_tag_pairing.sql';
import { TagPairing } from './tag_pairing.sql';

@Table({
    tableName: 'tag',
    timestamps: true,
    underscored: true,
    paranoid: true
})
export class Tag extends Model {

    @Length({min: 2, max: 20, msg: "Tag name must be between 2 and 20 characters long!"})
    @Column({
        allowNull: false
    })
    @Index
    name?: string;

    @BelongsToMany(() => Music, () => TagPairing)
    music?: Music[];

    @BelongsToMany(() => Playlist, () => PlaylistTagPairing)
    playlist?: Playlist[];

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