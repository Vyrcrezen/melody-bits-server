import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, HasMany, Index, IsAlphanumeric, IsDate, IsNumeric, Length, Model, Table, UpdatedAt } from "sequelize-typescript";
import { UserPostReaction } from "./post_reaction";
import { Thread } from "./thread";
import { UserAccount } from "./user_account.sql";

@Table({
    timestamps: true,
    underscored: true,
    tableName: 'post',
    paranoid: true,

})
export class Post extends Model {
    @IsAlphanumeric
    @Length({ min: 3, max: 600 })
    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    text?: string;

    @IsNumeric
    @Column({
        allowNull: false
    })
    @Index
    @ForeignKey(() => UserAccount)
    poster_id?: number;

    @BelongsTo(() => UserAccount, 'poster_id')
    poster?: UserAccount;

    @IsNumeric
    @Column({
        allowNull: true
    })
    @ForeignKey(() => Post)
    root_post_id?: number;

    @BelongsTo(() => Post, 'root_post_id')
    root_post?: Post;

    @IsNumeric
    @Column({
        allowNull: true
    })
    @Index
    @ForeignKey(() => Thread)
    thread_id?: number;

    @BelongsTo(() => Thread, 'thread_id')
    thread?: Thread;

    @HasMany(() => UserPostReaction, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: 'post_id'
    })
    user_reactions?: UserPostReaction[];

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
