import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../domain/repositories/user-repository.interface';
import { Email } from '../../../../domain/value-objects/email.vo';
import { PasswordHash } from '../../../../domain/value-objects/password-hash.vo';
import { UserId } from '../../../../domain/value-objects/user-id.vo';
import { UserDocument, User as UserData } from '../schemas/user.schema';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserData.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async save(user: User): Promise<void> {
    const id = user.getId().getValue();
    const data = {
      _id: id,
      email: user.getEmail().getValue(),
      passwordHash: user.getPasswordHash()?.getValue() ?? null,
      googleId: user.getGoogleId() ?? null,
    };

    await this.userModel.updateOne(
      { _id: id },
      { $set: data },
      { upsert: true },
    );
  }

  async findById(id: UserId): Promise<User | null> {
    const document = await this.userModel.findById(id.getValue()).exec();
    if (!document) return null;

    return this.mapToDomain(document);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const document = await this.userModel
      .findOne({ email: email.getValue() })
      .exec();
    if (!document) return null;

    return this.mapToDomain(document);
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const document = await this.userModel.findOne({ googleId }).exec();
    if (!document) return null;

    return this.mapToDomain(document);
  }

  private mapToDomain(document: UserDocument): User {
    return User.create(
      new UserId(document._id),
      new Email(document.email),
      document.passwordHash ? new PasswordHash(document.passwordHash) : null,
      document.googleId,
    );
  }
}
