import { Table, Column, Model, ForeignKey, Index, IsNumeric } from 'sequelize-typescript';
import { Music } from './music.sql';
import { Tag } from './tag.sql';

@Table({
    tableName: 'tag_pairing',
    timestamps: false
})
export class TagPairing extends Model {

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
    @ForeignKey(() => Music)
    @Index
    music_id?: number;
}