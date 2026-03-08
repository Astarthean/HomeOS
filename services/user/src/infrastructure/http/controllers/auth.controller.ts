import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { LoginWithGoogleHandler } from '../../../application/handlers/login-with-google.handler';
import { LoginWithGoogleCommand } from '../../../application/commands/login-with-google.command';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginWithGoogleHandler: LoginWithGoogleHandler,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const command = new LoginWithGoogleCommand(
      req.user.googleId,
      req.user.email,
    );
    const user = await this.loginWithGoogleHandler.execute(command);

    const payload = {
      sub: user.getId().getValue(),
      email: user.getEmail().getValue(),
    };

    const accessToken = await this.jwtService.signAsync(payload);

    res.json({
      access_token: accessToken,
      user: {
        id: user.getId().getValue(),
        email: user.getEmail().getValue(),
      },
    });
  }
}
