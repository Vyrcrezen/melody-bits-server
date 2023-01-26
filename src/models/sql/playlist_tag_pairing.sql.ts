import { Table, Column, Model, ForeignKey, Index, IsNumeric } from 'sequelize-typescript';
import { Playlist } from './playlist.sql';
import { Tag } from './tag.sql';

@Table({
    tableName: 'playlist_tag_pairing',
    timestamps: false
})
export class PlaylistTagPairing extends Model {

    @IsNumeric
    @Column({
        allowNull: false
    })
    @ForeignKey(() => Tag)
    @Index
    tag_id?: number;

    @IsNumeric
    @Column({
        allowNull: false
    })
    @ForeignKey(() => Playlist)
    @Index
    playlist_id?: number;
}