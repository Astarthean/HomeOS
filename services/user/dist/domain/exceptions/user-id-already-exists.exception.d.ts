import { DomainException } from './domain.exception';
export declare class UserIdAlreadyExistsException extends DomainException {
    constructor(id: string);
}
