import { Table, Column, Model, ForeignKey, Index, IsNumeric, IsDate, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Music } from './music.sql';
import { Playlist } from './playlist.sql';

@Table({
    tableName: 'playlist_pairing',
    timestamps: true,
    underscored: true
})
export class PlaylistPairing extends Model {

    @IsNumeric
    @Column({
        allowNull: false
    })
    @ForeignKey(() => Playlist)
    @Index
    playlist_id?: number;

    @IsNumeric
    @Column({
        allowNull: false
    })
    @ForeignKey(() => Music)
    @Index
    music_id?: number;

    @IsNumeric
    @Column({
        allowNull: false
    })
    position?: number;

    @IsDate
    @Column
    @CreatedAt
    created_at?: Date;

    @IsDate
    @Column
    @UpdatedAt
    updated_at?: Date;
}