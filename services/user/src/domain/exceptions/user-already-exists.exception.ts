import { DomainException } from './domain.exception';

export class UserAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super(`El usuario con email ${email} ya existe`);
  }
}
