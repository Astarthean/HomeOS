import { DomainException } from './domain.exception';

export class UserIdAlreadyExistsException extends DomainException {
  constructor(id: string) {
    super(`El usuario con ID ${id} ya existe`);
  }
}
