import { Schema, models, model } from 'mongoose';

const CatalogSchema = new Schema({
  title: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default models.Catalog || model('Catalog', CatalogSchema);
