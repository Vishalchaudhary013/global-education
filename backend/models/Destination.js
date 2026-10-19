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
    // Country guide content rendered on the destination detail page. Every key is
    // optional; anything left empty falls back to the bundled guide defaults.
    guide: {
        flagCode: String, // ISO 3166-1 alpha-2, e.g. "gb"
        tagline: String,
        universitiesCount: Number,
        stats: [{ label: String, value: String, icon: String }],
        whyStudy: String,
        programsIntro: String,
        popularPrograms: [String],
        requirements: {
            university: [String],
            tests: [String],
            visa: [String]
        },
        setsApart: String,
        studentLifeIntro: String,
        studentLife: {
            minWage: String,
            maxWorkHours: String,
            costOfLiving: [{ label: String, value: String }],
            costSource: String,
            studentVisa: [{ label: String, value: String }],
            postStudyVisa: [{ label: String, value: String }],
            visaSource: String,
            employment: [{ sector: String, demand: String }]
        },
        funFacts: [String],
        cities: [{ name: String, image: String }],
        faqs: [{ question: String, answer: String }],
        quickFacts: {
            capital: String,
            language: String,
            time: String,
            currency: String,
            population: String,
            immigrants: String
        },
        startDates: [String],
        temperature: {
            summary: String,
            cities: [{ city: String, range: String }],
            seasons: [{ name: String, months: String }]
        }
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);
