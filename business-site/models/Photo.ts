import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPhoto extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  createdAt: Date;
}

const PhotoSchema = new Schema<IPhoto>({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.Photo as Model<IPhoto>) || mongoose.model<IPhoto>('Photo', PhotoSchema);
