import express from 'express';
import  dotenv from 'dotenv'
import connectDB from './config/database.js';
import bookRoutes from "./routes/bookRoutes.js";
import authorsRoutes from "./routes/authorRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())
const PORT = 5000 || process.env.PORT;
connectDB();
 
app.use('/api/books', bookRoutes)
app.use('/api/authors',authorsRoutes)
app.use('/api/users', userRoutes)
app.use('api/loans', loanRoutes)


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) }); 



