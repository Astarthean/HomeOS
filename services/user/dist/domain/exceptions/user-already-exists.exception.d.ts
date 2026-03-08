import { DomainException } from './domain.exception';
export declare class UserAlreadyExistsException extends DomainException {
    constructor(email: string);
}
