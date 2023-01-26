import { Table, Column, Model, ForeignKey, Index, IsNumeric, IsDate, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Music } from './music.sql';
import { UserAccount } from './user_account.sql';

@Table({
    tableName: 'user_music_rating',
    timestamps: true,
    underscored: true
})
export class UserMusicRating extends Model {

    @IsNumeric
    @Column({
        allowNull: false
    })
    @ForeignKey(() => UserAccount)
    @Index
    user_id?: number;

    @IsNumeric
    @Column({
        allowNull: false
    })
    @ForeignKey(() => Music)
    @Index
    music_id?: number;

    @IsNumeric
    @Column
    rating?: number;

    @IsDate
    @Column
    @CreatedAt
    created_at?: Date;

    @IsDate
    @Column
    @UpdatedAt
    updated_at?: Date;
}