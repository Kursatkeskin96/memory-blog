import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
    kelime: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

export default mongoose?.models?.Word || mongoose.model('Word', WordSchema)