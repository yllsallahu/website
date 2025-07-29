import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  pdfUrl: string;
  issueDate: Date;
  description?: string;
}

const CertificateSchema = new Schema<ICertificate>({
  title: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  issueDate: { type: Date, required: true },
  description: { type: String },
});

export default (mongoose.models.Certificate as Model<ICertificate>) ||
  mongoose.model<ICertificate>('Certificate', CertificateSchema);
