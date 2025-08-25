import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTitleDto } from '../dto/create-title.dto';
import { TitleRepository } from '../title.repository';

@Injectable()
export class CreateTitleUseCase {
  constructor(
    private readonly titleRepository: TitleRepository,
  ) {}

  async execute(titleDto: CreateTitleDto) {
    const { title, type, releaseYear } = titleDto;

    // Verifica duplicidade de título no mesmo ano e tipo
    const existingTitle = await this.titleRepository.findByTitleAndYear(title, type, releaseYear);
    if (existingTitle) {
      throw new HttpException(
        'A title with this name, type, and year already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.titleRepository.create(titleDto);
  }
}
