import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  destination: { type: String, required: true },
  ranking: { type: String },
  ieltsRequirement: { type: String },
  logo: { type: String }, // image URL
  studyCost: { type: String },
  livingCost: { type: String },
  overview: { type: String },
  tuition: { type: String },
  intakes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('University', universitySchema);
