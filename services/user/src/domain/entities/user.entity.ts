import * as argon2 from 'argon2';
import { Email } from '../value-objects/email.vo';
import { PasswordHash } from '../value-objects/password-hash.vo';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private readonly id: UserId,
    private readonly email: Email,
    private readonly passwordHash: PasswordHash | null,
    private googleId?: string,
  ) {}

  public getId(): UserId {
    return this.id;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPasswordHash(): PasswordHash | null {
    return this.passwordHash;
  }

  public getGoogleId(): string | undefined {
    return this.googleId;
  }

  static create(
    id: UserId,
    email: Email,
    passwordHash: PasswordHash | null,
    googleId?: string,
  ): User {
    return new User(id, email, passwordHash, googleId);
  }

  public async validatePassword(plainPassword: string): Promise<boolean> {
    if (!this.passwordHash) {
      return false;
    }
    return argon2.verify(this.passwordHash.getValue(), plainPassword);
  }

  public updateGoogleId(googleId: string): void {
    this.googleId = googleId;
  }
}
