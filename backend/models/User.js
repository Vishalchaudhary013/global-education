import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'superadmin'], default: 'student' },
  phone: { type: String, default: "" },
  organization: { type: String, default: "" },
  region: { type: String, default: "" },
  status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Approved' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
