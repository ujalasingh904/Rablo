import mongoose, { connect } from 'mongoose';

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    } catch (error) {
        console.log(`Error while connecting to database: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;