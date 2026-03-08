import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User as UserData, UserSchema } from './infrastructure/persistence/mongoose/schemas/user.schema';
import { MongooseUserRepository } from './infrastructure/persistence/mongoose/repositories/mongoose-user.repository';
import { RegisterUserHandler } from './application/handlers/register-user.handler';
import { RegisterUserController } from './infrastructure/http/controllers/register-user.controller';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './infrastructure/http/filters/domain-exception.filter';

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
  ],
  controllers: [RegisterUserController],
  providers: [
    RegisterUserHandler,
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
