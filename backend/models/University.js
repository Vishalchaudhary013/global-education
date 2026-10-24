import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  destination: { type: String, required: true },
  ranking: { type: String },
  established: { type: String }, // founding year, e.g. "1827"
  famousFor: { type: String }, // comma-separated strengths shown in the hero
  website: { type: String }, // official site URL
  acceptanceRate: { type: String }, // e.g. "70%-75%"
  studentTeacherRatio: { type: String }, // e.g. "14:1"
  genderRatio: { type: String }, // male : female, e.g. "67 : 33"
  // Students placed at this university, shown as success stories.
  successStories: [{
    _id: false,
    studentName: { type: String },
    course: { type: String },
    intake: { type: String },
    story: { type: String },
  }],
  // Extra FAQ entries; the page also generates standard ones from the fields above.
  faqs: [{
    _id: false,
    question: { type: String },
    answer: { type: String },
  }],
  // Admission requirements, one item per line.
  applicationSteps: { type: String },
  requiredDocuments: { type: String },
  // One entry per ranking body per year, e.g. { source: "QS", year: 2025, rank: "472" }.
  // `rank` is a string so published bands like "301-350" fit.
  rankings: [{
    _id: false,
    source: { type: String },
    year: { type: Number },
    rank: { type: String },
  }],
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
