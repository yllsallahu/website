import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICatalog extends Document {
  title: string;
  pdfUrl: string;
  createdAt: Date;
}

const CatalogSchema = new Schema<ICatalog>({
  title: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.Catalog as Model<ICatalog>) || mongoose.model<ICatalog>('Catalog', CatalogSchema);
