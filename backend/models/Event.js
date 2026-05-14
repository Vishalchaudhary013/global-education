import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mode: { type: String, enum: ['online', 'offline', 'hybrid'], required: true },
  type: { type: String },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String }, // optional for online
  logo: { type: String },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },
  countries: [{ type: String }],
  highlights: [{ type: String }],
  universities: [{
    name: { type: String },
    country: { type: String },
    role: { type: String }
  }],
  description: { type: String },
  venue: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
