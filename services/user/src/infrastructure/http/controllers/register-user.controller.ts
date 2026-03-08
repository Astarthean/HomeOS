import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterUserHandler } from '../../../application/handlers/register-user.handler';
import { RegisterUserCommand } from '../../../application/commands/register-user.command';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class RegisterUserController {
  constructor(
    private readonly registerUserHandler: RegisterUserHandler
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto): Promise<void> {
    const command = new RegisterUserCommand(
      dto.id ?? uuidv4(),
      dto.email,
      dto.password,
    );
    
    await this.registerUserHandler.execute(command);
  }
}
