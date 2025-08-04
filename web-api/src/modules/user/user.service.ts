import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }


} 