import { Table, Column, Model, HasMany, Index, CreatedAt, UpdatedAt, DeletedAt, Length, IsDate } from 'sequelize-typescript';
import { Music } from './music.sql';

@Table({
    tableName: 'record_label',
    timestamps: false,
    underscored: true,
    paranoid: true
})
export class RecordLabel extends Model {

    @Length({min: 2, max: 128, msg: "Record label name must be between 2 and 128 characters long!"})
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