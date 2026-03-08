import { Email } from '../value-objects/email.vo';
import { PasswordHash } from '../value-objects/password-hash.vo';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private readonly id: UserId,
    private readonly email: Email,
    private readonly passwordHash: PasswordHash,
  ) {}

  public getId(): UserId {
    return this.id;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPasswordHash(): PasswordHash {
    return this.passwordHash;
  }

  static create(id: UserId, email: Email, passwordHash: PasswordHash): User {
    return new User(id, email, passwordHash);
  }
}
