import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TitleEntity } from './entities/title.entity';
import { TitleController } from './title.controller';
import { CreateTitleUseCase } from './use-cases/create-title.use-case';
import { UpdateTitleUseCase } from './use-cases/update-title.use-case';
import { DeleteTitleUseCase } from './use-cases/delete-title.use-case';
import { TitleRepository } from './title.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([TitleEntity]),
  ],
  controllers: [TitleController],
  providers: [
    // Use Cases
    CreateTitleUseCase,
    UpdateTitleUseCase,
    DeleteTitleUseCase,

    // Repository
    TitleRepository,
  ],
  exports: [],
})
export class TitleModule {}
