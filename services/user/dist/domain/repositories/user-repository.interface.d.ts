import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';
export interface UserRepository {
    save(user: User): Promise<void>;
    findById(id: UserId): Promise<User | null>;
    findByEmail(email: Email): Promise<User | null>;
    findByGoogleId(googleId: string): Promise<User | null>;
}
