import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  uf: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  addressNumber?: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsNumber()
  status?: number;

  @IsNotEmpty()
  @IsNumber()
  profileId: number;
} 