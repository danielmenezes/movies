import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(user: CreateUserDto) {
    try {
      const { email, password } = user;

      const existingUser = await this.userRepository.getByEmail(email);
      if (existingUser) {
        throw new HttpException('Já existe um usuário cadastrado com este email', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      return this.userRepository.create({ ...user, password: hashedPassword });
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 