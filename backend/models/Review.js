import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  university: { type: String, required: true },
  destination: { type: String },
  reviewText: { type: String },
  videoUrl: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  companyPlaced: { type: String } // For the "Job Achievement Section"
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
