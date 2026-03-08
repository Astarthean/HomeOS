import { RegisterUserHandler } from '../../../application/handlers/register-user.handler';
import { RegisterUserDto } from '../dtos/register-user.dto';
export declare class RegisterUserController {
    private readonly registerUserHandler;
    constructor(registerUserHandler: RegisterUserHandler);
    register(dto: RegisterUserDto): Promise<void>;
}
