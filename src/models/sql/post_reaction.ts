import { Table, Column, Model, IsDate, CreatedAt, UpdatedAt, BelongsTo, IsNumeric, ForeignKey } from 'sequelize-typescript';
import { UserAccount } from './user_account.sql';
import { Post } from './post';
import { Reaction } from './reaction';

@Table({
    tableName: 'user_post_reaction',
    timestamps: true,
    underscored: true
})
export class UserPostReaction extends Model {

    @BelongsTo(() => UserAccount, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: 'user_id',
        keyType: 'number',
    })
    user?: UserAccount;

    @BelongsTo(() => Post, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: 'post_id',
        keyType: 'number',
    })
    post?: Post;

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