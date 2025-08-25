import { IsString, IsNotEmpty, IsOptional, IsIn, IsNumber } from 'class-validator';

export class CreateTitleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['movie', 'serie'])
  type: 'movie' | 'serie';

  @IsOptional()
  @IsNumber()
  releaseYear?: number;
}
