import { Table, Column, Model, IsDate, CreatedAt, UpdatedAt, BelongsTo, IsNumeric, ForeignKey } from 'sequelize-typescript';
import { UserCommentMusic } from './user_comment_music.sql';
import { UserAccount } from './user_account.sql';
import { Reaction } from './reaction';

@Table({
    tableName: 'user_comment_music_reaction',
    timestamps: true,
    underscored: true
})
export class UserCommentMusicReaction extends Model {

    // @IsNumeric
    // @Column({
    //     allowNull: false
    // })
    // @ForeignKey(() => UserAccount)
    // @Index
    // user_id?: number;

    @BelongsTo(() => UserAccount, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: 'user_id',
        keyType: 'number',
    })
    commenter?: UserAccount;

    // @IsNumeric
    // @Column({
    //     allowNull: false
    // })
    // @ForeignKey(() => UserCommentMusic)
    // @Index
    // music_comment_id?: number;

    @BelongsTo(() => UserCommentMusic, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: 'music_comment_id',
        keyType: 'number',
    })
    music_comment?: UserCommentMusic;

    @IsNumeric
    @Column({
        allowNull: false
    })
    @ForeignKey(() => Reaction)
    reaction_id?: number;

    @IsDate
    @Column
    @CreatedAt
    created_at?: Date;

    @IsDate
    @Column
    @UpdatedAt
    updated_at?: Date;
}