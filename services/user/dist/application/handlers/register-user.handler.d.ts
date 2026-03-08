import type { UserRepository } from '../../domain/repositories/user-repository.interface';
import { RegisterUserCommand } from '../commands/register-user.command';
export declare class RegisterUserHandler {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: RegisterUserCommand): Promise<void>;
}
