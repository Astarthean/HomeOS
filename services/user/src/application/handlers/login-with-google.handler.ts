import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../../domain/repositories/user-repository.interface';
import { LoginWithGoogleCommand } from '../commands/login-with-google.command';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { UserId } from '../../domain/value-objects/user-id.vo';

@Injectable()
export class LoginWithGoogleHandler {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginWithGoogleCommand): Promise<User> {
    let user = await this.userRepository.findByGoogleId(command.googleId);

    if (user) return user;

    const email = new Email(command.email);
    user = await this.userRepository.findByEmail(email);

    if (user) {
      user.updateGoogleId(command.googleId);
      await this.userRepository.save(user);
      return user;
    }

    const newUser = User.create(
      UserId.generate(),
      email,
      null,
      command.googleId,
    );

    await this.userRepository.save(newUser);
    return newUser;
  }
}
