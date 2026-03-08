import { Body, Controller, Post, Get, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserHandler } from '../../../application/handlers/login-user.handler';
import { LoginUserCommand } from '../../../application/commands/login-user.command';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('users')
export class LoginUserController {
  constructor(
    private readonly loginUserHandler: LoginUserHandler,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const command = new LoginUserCommand(dto.email, dto.password);

    const user = await this.loginUserHandler.execute(command);

    const payload = {
      sub: user.getId().getValue(),
      email: user.getEmail().getValue(),
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }
}
