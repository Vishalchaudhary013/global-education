import mongoose from 'mongoose';

const counsellingRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  destination: { type: String },
  courseLevel: { type: String },
  message: { type: String },
  status: { type: String, enum: ['pending', 'contacted', 'resolved'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('CounsellingRequest', counsellingRequestSchema);
