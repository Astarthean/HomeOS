import type { UserRepository } from '../../domain/repositories/user-repository.interface';
import { LoginWithGoogleCommand } from '../commands/login-with-google.command';
import { User } from '../../domain/entities/user.entity';
export declare class LoginWithGoogleHandler {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: LoginWithGoogleCommand): Promise<User>;
}
