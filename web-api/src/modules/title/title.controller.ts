import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  ValidationPipe 
} from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { CreateTitleUseCase } from './use-cases/create-title.use-case';
import { DeleteTitleUseCase } from './use-cases/delete-title.use-case';
import { TitleRepository } from './title.repository';
import { UpdateTitleUseCase } from './use-cases/update-title.use-case';
import { Auth } from 'src/common/jwt/auth';

@Controller('titles')
export class TitleController {
  constructor(
    private readonly createTitleUseCase: CreateTitleUseCase,
    private readonly updateTitleUseCase: UpdateTitleUseCase,
    private readonly deleteTitleUseCase: DeleteTitleUseCase,
    private readonly titleRepository: TitleRepository, // para o GET
  ) {}

  @Post()
  @Auth()
  create(
    @Body(new ValidationPipe({ whitelist: true, transform: true })) 
    createTitleDto: CreateTitleDto,
  ) {
    return this.createTitleUseCase.execute(createTitleDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.titleRepository.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: number) {
    return this.titleRepository.findById(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) 
    updateTitleDto: UpdateTitleDto,
  ) {
    return this.updateTitleUseCase.execute(id, updateTitleDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: number) {
    return this.deleteTitleUseCase.execute(id);
  }
}
