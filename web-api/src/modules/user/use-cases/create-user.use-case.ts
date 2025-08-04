import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(user: CreateUserDto) {
    try {
      const { email, cpf } = user;

      // Verifica se já existe um usuário com o mesmo email
      const existingUser = await this.userRepository.getByEmail(email);
      if (existingUser) {
        throw new HttpException('Já existe um usuário cadastrado com este email', HttpStatus.BAD_REQUEST);
      }

      // Verifica se já existe um usuário com o mesmo CPF
      const existingUserByCpf = await this.userRepository.getByCpf(cpf);
      if (existingUserByCpf) {
        throw new HttpException('Já existe um usuário cadastrado com este CPF', HttpStatus.BAD_REQUEST);
      }



      return;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 