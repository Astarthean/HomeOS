import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  passwordHash: string;

  @Prop({ required: false, unique: true, sparse: true })
  googleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
