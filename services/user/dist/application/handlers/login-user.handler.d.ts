import type { UserRepository } from '../../domain/repositories/user-repository.interface';
import { LoginUserCommand } from '../commands/login-user.command';
import { User } from '../../domain/entities/user.entity';
export declare class LoginUserHandler {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: LoginUserCommand): Promise<User>;
}
