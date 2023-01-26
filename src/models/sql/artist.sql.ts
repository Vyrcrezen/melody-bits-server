import { Table, Column, Model, HasMany, Index, CreatedAt, UpdatedAt, DeletedAt, Length, IsDate } from 'sequelize-typescript';
import { Music } from './music.sql';

@Table({
    tableName: 'artist',
    timestamps: true,
    paranoid: true,
    underscored: true
})
export class Artist extends Model {

    @Length({min: 2, max: 128, msg: "Artist name must be between 2 and 128 characters long!"})
    @Column({
        allowNull: false
    })
    @Index
    name?: string;

    @HasMany(() => Music)
    music?: Music[];

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