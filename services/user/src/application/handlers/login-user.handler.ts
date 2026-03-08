import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../../domain/repositories/user-repository.interface';
import { LoginUserCommand } from '../commands/login-user.command';
import { Email } from '../../domain/value-objects/email.vo';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials.exception';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class LoginUserHandler {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginUserCommand): Promise<User> {
    const email = new Email(command.email);
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await user.validatePassword(command.passwordPlain);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return user;
  }
}
