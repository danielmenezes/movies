import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
} from 'sequelize-typescript';
import { ProfileEntity } from './profile.entity';

@Table({ timestamps: true, schema: 'dbo', tableName: 'users' })
export class UserEntity extends Model<UserEntity> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING(), allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  status: number;

  @ForeignKey(() => ProfileEntity)
  @Column({ field: 'profile_id', type: DataType.INTEGER, allowNull: false })
  profileId: number;

  @BelongsTo(() => ProfileEntity)
  profile: ProfileEntity;

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: false })
  declare updatedAt: Date;
}
