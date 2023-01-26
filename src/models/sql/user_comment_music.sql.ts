import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, HasMany, Index, IsDate, IsNumeric, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Music } from "./music.sql";
import { UserAccount } from "./user_account.sql";
import { UserCommentMusicReaction } from "./user_comment_music_reaction";

@Table({
    tableName: 'user_comment_music',
    timestamps: true,
    underscored: true,
    paranoid: true
})
export class UserCommentMusic extends Model {

    @IsNumeric
    @Column({
        allowNull: false
    })
    @Index
    @ForeignKey(() => UserAccount)
    user_id?: number;

    @BelongsTo(() => UserAccount, 'user_id')
    user?: UserAccount;

    @IsNumeric
    @Column({
        allowNull: false
    })
    @Index
    @ForeignKey(() => Music)
    music_id?: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    comment_text?: string;

    @HasMany(() => UserCommentMusicReaction, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: 'music_comment_id'
    })
    user_reactions?: UserCommentMusicReaction[];

    @IsDate
    @Column
    @Index
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
