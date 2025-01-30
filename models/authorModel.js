import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    nationality: {
        type: String
    },
    biography: {
        type: String
    },
}, { timestamps: true })

export default mongoose.model('Author', authorSchema);