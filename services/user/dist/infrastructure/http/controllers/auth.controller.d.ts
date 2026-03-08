import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { LoginWithGoogleHandler } from '../../../application/handlers/login-with-google.handler';
export declare class AuthController {
    private readonly jwtService;
    private readonly loginWithGoogleHandler;
    constructor(jwtService: JwtService, loginWithGoogleHandler: LoginWithGoogleHandler);
    googleAuth(_req: any): Promise<void>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
}
