import express from 'express';
import  dotenv from 'dotenv'
import connectDB from './config/database.js';
import bookRoutes from "./routes/bookRoutes.js";
import authorsRoutes from "./routes/authorRoutes.js";
dotenv.config();

const app = express();
app.use(express.json())
const PORT = 5000 || process.env.PORT;
connectDB();
 
app.use('/api/books', bookRoutes)
app.use('/api/authors',authorsRoutes)


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) }); 



