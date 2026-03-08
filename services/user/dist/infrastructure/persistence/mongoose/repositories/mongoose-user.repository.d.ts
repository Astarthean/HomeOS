import { Model } from 'mongoose';
import { User } from '../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../domain/repositories/user-repository.interface';
import { Email } from '../../../../domain/value-objects/email.vo';
import { UserId } from '../../../../domain/value-objects/user-id.vo';
import { UserDocument } from '../schemas/user.schema';
export declare class MongooseUserRepository implements UserRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    save(user: User): Promise<void>;
    findById(id: UserId): Promise<User | null>;
    findByEmail(email: Email): Promise<User | null>;
    private mapToDomain;
}
