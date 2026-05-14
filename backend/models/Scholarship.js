import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },
  amount: { type: String, required: true },
  eligibility: { type: String },
  deadline: { type: Date },
  level: { type: String },
  provider: { type: String },
  noOfAwards: { type: String },
  description: { type: String },
  fields: [{ type: String }],
  benefits: [{ type: String }],
  requirements: [{ type: String }],
  howToApply: { type: String },
  officialLink: { type: String },
  tags: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Scholarship', scholarshipSchema);
