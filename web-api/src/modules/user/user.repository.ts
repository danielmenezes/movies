
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity)
    private readonly userEntity: typeof UserEntity,
  ) {}
  
  async create(user: Partial<UserEntity>): Promise<boolean> {
    return !!await this.userEntity.create(user);
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userEntity.findOne({
      where: { email }
    });
  }

}