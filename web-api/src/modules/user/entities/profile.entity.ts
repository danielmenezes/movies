import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table({ timestamps: true, schema: 'dbo', tableName: 'profiles' })
export class ProfileEntity extends Model<ProfileEntity>  {

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;
  
  @Column({ type: DataType.INTEGER, allowNull: false })
  status: number;

  @HasMany(() => UserEntity)
  users: UserEntity[];
}