import { Table, Column, Model, ForeignKey, Index, IsNumeric } from 'sequelize-typescript';
import { Music } from './music.sql';
import { UserAccount } from './user_account.sql';

@Table({
    tableName: 'user_favorite_music',
    timestamps: false
})
export class UserFavoriteMusic extends Model {

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
}