import { Column, DataType, ForeignKey, Index, IsDate, IsNumeric, Model, Table} from "sequelize-typescript";
import { Music } from "./music.sql";

@Table({
    tableName: 'music_approval',
    timestamps: false,
    underscored: true,
    paranoid: true
})
export class MusicApproval extends Model {

    @IsNumeric
    @Column({
        allowNull: false
    })
    @Index
    @ForeignKey(() => Music)
    music_id?: number;

    @IsNumeric
    @Column({
        type: DataType.TINYINT
    })
    status?: number;

    @IsDate
    @Column
    approval_time?: Date;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    message?: string;
}
