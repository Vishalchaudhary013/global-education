import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // UG, PG, Diploma
  destination: { type: String, required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  duration: { type: String, required: true },
  feePerYear: { type: Number }, // tuition per year, in the destination's local currency
  overview: { type: String }, // "About the course" text on the course page
  highlights: { type: String }, // one per line, "Title: description" (description optional)
  curriculum: { type: String }, // one stage per line, "Year 1: module, module, ..."
  specialisations: { type: String }, // comma-separated
  // Extra FAQ entries; the page also generates standard ones from the fields above.
  faqs: [{
    _id: false,
    question: { type: String },
    answer: { type: String },
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
