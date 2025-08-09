import { Global, Module } from '@nestjs/common';
import { LoginUseCase } from './use-cases/login.use-case';
import { RefreshTokenUseCase } from './use-cases/refresh-token-use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/jwt/jwt-strategy';
import { UserModule } from '@user/user.module';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from 'src/common/jwt/jwt-refresh.strategy';

@Global()
@Module({
	imports: [
		JwtModule.register({}),
		UserModule
	],
	controllers: [AuthController],
	providers: [
		// UseCases 
		LoginUseCase,
		RefreshTokenUseCase,

		// Strategy
		JwtStrategy,
		JwtRefreshStrategy
	],
	exports: [JwtStrategy]
})
export class AuthModule {}
