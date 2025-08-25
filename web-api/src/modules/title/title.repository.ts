import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TitleEntity } from './entities/title.entity';

@Injectable()
export class TitleRepository {
  constructor(
    @InjectModel(TitleEntity)
    private readonly titleEntity: typeof TitleEntity,
  ) {}


  async create(title: Partial<TitleEntity>): Promise<TitleEntity> {
    return this.titleEntity.create(title);
  }

  async findByTitleAndYear(
    title: string,
    type: 'movie' | 'serie',
    releaseYear?: number,
  ): Promise<TitleEntity | null> {
    return this.titleEntity.findOne({
      where: {
        title,
        type,
        releaseYear: releaseYear ?? null, // se não passar o ano, considera null
      },
    });
  }

  async findAll(): Promise<TitleEntity[]> {
    return this.titleEntity.findAll();
  }

  async findById(id: number): Promise<TitleEntity | null> {
    return this.titleEntity.findByPk(id);
  }

  async update(id: number, updateData: Partial<TitleEntity>): Promise<TitleEntity> {
    const title = await this.findById(id);
    if (!title) return null;

    return title.update(updateData);
  }

  async delete(id: number): Promise<void> {
    const title = await this.findById(id);
    if (!title) return;
    await title.destroy();
  }
}
