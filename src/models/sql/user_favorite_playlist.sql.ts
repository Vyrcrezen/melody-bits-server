import { Table, Column, Model, ForeignKey, Index, IsNumeric } from 'sequelize-typescript';
import { Playlist } from './playlist.sql';
import { UserAccount } from './user_account.sql';

@Table({
    tableName: 'user_favorite_playlist',
    timestamps: false,
})
export class UserFavoritePlaylist extends Model {

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
    @ForeignKey(() => Playlist)
    @Index
    playlist_id?: number;
}