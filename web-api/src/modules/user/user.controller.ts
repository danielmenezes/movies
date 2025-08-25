import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { Auth } from 'src/common/jwt/auth';


@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @Auth()
  create(@Body(new ValidationPipe({
    whitelist: true,
    transform: true,
  })) 
  createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

} 