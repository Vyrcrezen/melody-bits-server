import { BelongsTo, Column, CreatedAt, DeletedAt, ForeignKey, HasMany, Index, IsAlphanumeric, IsDate, IsNumeric, Length, Model, Table, UpdatedAt, DataType } from "sequelize-typescript";
import { Post } from "./post";
import { UserAccount } from "./user_account.sql";

@Table({
    timestamps: true,
    underscored: true,
    tableName: 'thread',
    paranoid: true,

})
export class Thread extends Model {

    @IsAlphanumeric
    @Length({ min: 3, max: 64 })
    @Column({
        allowNull: false
    })
    @Index
    thread_name?: string;

    @HasMany(() => Post, 'thread_id')
    music_uploaded?: Post[];

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
        type: DataType.TINYINT
    })
    is_sticky?: boolean;


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
