import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    isbn:{
        type: String,
        unique: true,
        required: true
    },
    publishedDate:{
        type: Date 
    },
    genre:{
        type:String
    },
    coverImage:{
        type: String
    }

},{timestamps:true});

export default mongoose.model('Book', bookSchema);