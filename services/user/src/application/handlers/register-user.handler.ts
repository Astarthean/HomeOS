import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from '../../domain/entities/user.entity';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';
import { UserIdAlreadyExistsException } from '../../domain/exceptions/user-id-already-exists.exception';
import type { UserRepository } from '../../domain/repositories/user-repository.interface';
import { Email } from '../../domain/value-objects/email.vo';
import { PasswordHash } from '../../domain/value-objects/password-hash.vo';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { RegisterUserCommand } from '../commands/register-user.command';

@Injectable()
export class RegisterUserHandler {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
    const userId = new UserId(command.id);
    const email = new Email(command.email);

    const existingById = await this.userRepository.findById(userId);
    if (existingById) {
      throw new UserIdAlreadyExistsException(userId.getValue());
    }

    const existingByEmail = await this.userRepository.findByEmail(email);
    if (existingByEmail) {
      throw new UserAlreadyExistsException(email.getValue());
    }

    const plainHash = await argon2.hash(command.passwordPlain);
    const password = new PasswordHash(plainHash);

    const user = User.create(userId, email, password);
    await this.userRepository.save(user);
  }
}
