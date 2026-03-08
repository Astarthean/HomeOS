import { JwtService } from '@nestjs/jwt';
import { LoginUserHandler } from '../../../application/handlers/login-user.handler';
import { LoginUserDto } from '../dtos/login-user.dto';
export declare class LoginUserController {
    private readonly loginUserHandler;
    private readonly jwtService;
    constructor(loginUserHandler: LoginUserHandler, jwtService: JwtService);
    login(dto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
