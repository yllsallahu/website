import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin' | 'user';
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true, default: 'user' },
});

UserSchema.index({ email: 1 }, { unique: true });

export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
