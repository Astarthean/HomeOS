import { Email } from '../value-objects/email.vo';
import { PasswordHash } from '../value-objects/password-hash.vo';
import { UserId } from '../value-objects/user-id.vo';
export declare class User {
    private readonly id;
    private readonly email;
    private readonly passwordHash;
    private googleId?;
    constructor(id: UserId, email: Email, passwordHash: PasswordHash | null, googleId?: string | undefined);
    getId(): UserId;
    getEmail(): Email;
    getPasswordHash(): PasswordHash | null;
    getGoogleId(): string | undefined;
    static create(id: UserId, email: Email, passwordHash: PasswordHash | null, googleId?: string): User;
    validatePassword(plainPassword: string): Promise<boolean>;
    updateGoogleId(googleId: string): void;
}
