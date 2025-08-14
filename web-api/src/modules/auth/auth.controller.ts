import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LoginUseCase } from './use-cases/login.use-case';
import { LoginDto } from './dto/login.dto';
import { RefreshAuth } from 'src/common/jwt/refresh-auth';
import { RefreshTokenUseCase } from './use-cases/refresh-token-use-case';
import { User } from 'src/common/decorators/user';
import { Auth } from 'src/common/jwt/auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @Post('refresh-token')
  @RefreshAuth()
  refreshTokens(@User() user: any) {
    return this.refreshTokenUseCase.execute(user);
  }

  @Post('verify-credentials')
  @Auth()
  verifyCredentials() {
    return true;
  }


} 