import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user', required: true }
});

UserSchema.index({ email: 1 }, { unique: true });

export default models.User || model('User', UserSchema);
