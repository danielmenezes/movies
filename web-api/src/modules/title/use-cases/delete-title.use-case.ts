import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TitleRepository } from '../title.repository';

@Injectable()
export class DeleteTitleUseCase {
  constructor(private readonly titleRepository: TitleRepository) {}

  async execute(id: number) {
    const existingTitle = await this.titleRepository.findById(id);
    if (!existingTitle) {
      throw new HttpException('Title not found', HttpStatus.NOT_FOUND);
    }

    return this.titleRepository.delete(id);
  }
}
