import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ timestamps: true, schema: 'dbo', tableName: 'titles' })
export class TitleEntity extends Model<TitleEntity> {
  
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(200) })
  title: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  description?: string;

  @AllowNull(false)
  @Column({ type: DataType.ENUM('movie', 'serie') })
  type: 'movie' | 'serie';

  @AllowNull(true)
  @Column({ field: 'release_year', type: DataType.INTEGER })
  releaseYear?: number;

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: false })
  declare updatedAt: Date;
}
