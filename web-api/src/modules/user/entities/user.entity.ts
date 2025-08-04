import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';
import { ProfileEntity } from './profile.entity';

@Table({ timestamps: true, schema: 'dbo', tableName: 'users' })
export class UserEntity extends Model<UserEntity> {

  @PrimaryKey
  @Column({ field: 'firebase_uid', type: DataType.STRING, allowNull: false })
  firebaseUid: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  email: string;

  @Column({ field: 'first_name', type: DataType.STRING(100), allowNull: false })
  firstName: string;

  @Column({ field: 'last_name', type: DataType.STRING(100), allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING(11), allowNull: false, unique: true })
  cpf: string;

  @AllowNull
  @Column({ type: DataType.STRING(30) })
  rg?: string;

  @Column({ field: 'birth_date', type: DataType.DATEONLY, allowNull: false })
  birthDate: Date;

  @AllowNull
  @Column({ type: DataType.STRING(50) })
  city?: string;

  @AllowNull
  @Column({ type: DataType.STRING(50) })
  uf?: string;

  @AllowNull
  @Column({ type: DataType.STRING(250) })
  address?: string;

  @AllowNull
  @Column({ field: 'address_number', type: DataType.STRING(10) })
  addressNumber?: string;

  @AllowNull
  @Column({ type: DataType.STRING(30) })
  phone?: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: true })
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
