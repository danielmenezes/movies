import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from '@user/entities/user.entity';
import { ProfileEntity } from '@user/entities/profile.entity';
import { UsersController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UserRepository } from './user.repository';


@Module({
  imports: [
    SequelizeModule.forFeature([UserEntity, ProfileEntity]),
  ],
  controllers: [UsersController],
  providers: [
    // UseCases 
    CreateUserUseCase,

    // Repositories
    UserRepository,
  ],
  exports: [UserRepository]
})
export class UserModule {}
