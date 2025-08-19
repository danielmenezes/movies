import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async execute(user: LoginDto) {
    const { email, password } = user;

    const existingUser = (await this.userRepository.getByEmail(email))?.toJSON();

    if (!existingUser) {
      throw new HttpException('Usuário ou senha inválidos', HttpStatus.BAD_REQUEST);
    }
    
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      throw new HttpException('Usuário ou senha inválidos', HttpStatus.BAD_REQUEST);
    }

    const payload = { email, sub: existingUser.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: existingUser.name
    };
  }
} 