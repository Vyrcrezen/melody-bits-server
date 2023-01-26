import { Column, DataType, Length, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'user_bio',
    timestamps: false
})
export class UserBio extends Model {

    @Length({ min: 2, max: 1200 })
    @Column({
        type: DataType.TEXT
    })
    bio_text?: string;

}
