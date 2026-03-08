import { Email } from '../value-objects/email.vo';
import { PasswordHash } from '../value-objects/password-hash.vo';
import { UserId } from '../value-objects/user-id.vo';
export declare class User {
    private readonly id;
    private readonly email;
    private readonly passwordHash;
    constructor(id: UserId, email: Email, passwordHash: PasswordHash);
    getId(): UserId;
    getEmail(): Email;
    getPasswordHash(): PasswordHash;
    static create(id: UserId, email: Email, passwordHash: PasswordHash): User;
}
