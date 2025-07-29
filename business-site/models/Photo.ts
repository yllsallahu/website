import { Schema, models, model } from 'mongoose';

const PhotoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default models.Photo || model('Photo', PhotoSchema);
