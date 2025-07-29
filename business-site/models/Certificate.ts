import { Schema, models, model } from 'mongoose';

const CertificateSchema = new Schema({
  title: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  issueDate: { type: Date, required: true },
  description: { type: String }
});

export default models.Certificate || model('Certificate', CertificateSchema);
