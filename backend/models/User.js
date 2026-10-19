import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  /**
   * Encrypted copy of the password so a Super Admin can read it back from the
   * dashboard. `select: false` keeps it out of every ordinary query — only
   * `getUserPassword` asks for it. See `utils/passwordVault.js`.
   */
  passwordVault: { type: String, default: '', select: false },
  role: { type: String, enum: ['student', 'admin', 'superadmin'], default: 'student' },
  phone: { type: String, default: "" },
  organization: { type: String, default: "" },
  region: { type: String, default: "" },
  status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Approved' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
