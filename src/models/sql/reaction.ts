import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Length, IsDate, HasMany } from 'sequelize-typescript';
import { UserPostReaction } from './post_reaction';
import { UserCommentMusicReaction } from './user_comment_music_reaction';

@Table({
    tableName: 'reaction',
    timestamps: true,
    underscored: true,
    paranoid: true
})
export class Reaction extends Model {

    @Length({min: 2, max: 20, msg: "Tag name must be between 2 and 7 characters long!"})
    @Column({
        allowNull: false
    })
    reaction_name?: string;

    @HasMany(() => UserPostReaction)
    post_reactions?: UserPostReaction[];

    @HasMany(() => UserCommentMusicReaction)
    comment_music_reactions?: UserCommentMusicReaction[];

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