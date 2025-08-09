import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';


@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  create(@Body(new ValidationPipe({
    whitelist: true,
    transform: true,
  })) 
  createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

} 