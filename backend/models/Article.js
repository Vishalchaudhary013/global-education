import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String },
    authorRole: { type: String },
    date: { type: Date, default: Date.now },
    readTime: { type: String },
    img: { type: String },
    excerpt: { type: String },
    tags: [{ type: String }],
    content: [{
        heading: { type: String },
        body: { type: String }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Article', articleSchema);
