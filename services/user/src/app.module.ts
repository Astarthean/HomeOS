import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User as UserData, UserSchema } from './infrastructure/persistence/mongoose/schemas/user.schema';
import { MongooseUserRepository } from './infrastructure/persistence/mongoose/repositories/mongoose-user.repository';
import { RegisterUserHandler } from './application/handlers/register-user.handler';
import { LoginUserHandler } from './application/handlers/login-user.handler';
import { LoginWithGoogleHandler } from './application/handlers/login-with-google.handler';
import { RegisterUserController } from './infrastructure/http/controllers/register-user.controller';
import { LoginUserController } from './infrastructure/http/controllers/login-user.controller';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './infrastructure/http/filters/domain-exception.filter';
import { JwtStrategy } from './infrastructure/auth/strategies/jwt.strategy';
import { GoogleStrategy } from './infrastructure/auth/strategies/google.strategy';
import { AuthController } from './infrastructure/http/controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: UserData.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [RegisterUserController, LoginUserController, AuthController],
  providers: [
    RegisterUserHandler,
    LoginUserHandler,
    LoginWithGoogleHandler,
    JwtStrategy,
    GoogleStrategy,
    {
      provide: 'UserRepository',
      useClass: MongooseUserRepository,
    },
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
