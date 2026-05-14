import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    heroImage: { type: String },
    description: { type: String },
    universities: [{
        name: String,
        location: String,
        ranking: String,
        ieltsRequirement: String,
        studyCost: String,
        logo: String
    }],
    scholarships: [{
        name: String,
        amount: String,
        criteria: String
    }],
    costs: {
        ug: String,
        pg: String,
        living: String
    },
    jobs: [{
        title: String,
        salary: String
    }],
    visa: {
        processSummary: String,
        points: [String]
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);
