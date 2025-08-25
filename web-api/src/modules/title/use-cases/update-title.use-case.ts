import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TitleRepository } from '../title.repository';
import { UpdateTitleDto } from '../dto/update-title.dto';

@Injectable()
export class UpdateTitleUseCase {
  constructor(private readonly titleRepository: TitleRepository) {}

  async execute(id: number, updateData: UpdateTitleDto) {
    const existingTitle = await this.titleRepository.findById(id);
    if (!existingTitle) {
      throw new HttpException('Title not found', HttpStatus.NOT_FOUND);
    }

    // Opcional: validar duplicidade se o título, tipo ou ano forem alterados
    if (updateData.title || updateData.type || updateData.releaseYear) {
      const duplicate = await this.titleRepository.findByTitleAndYear(
        updateData.title ?? existingTitle.title,
        updateData.type ?? existingTitle.type,
        updateData.releaseYear ?? existingTitle.releaseYear,
      );
      if (duplicate && duplicate.id !== id) {
        throw new HttpException(
          'A title with this name, type, and year already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.titleRepository.update(id, updateData);
  }
}
