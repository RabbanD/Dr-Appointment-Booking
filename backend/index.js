import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js'
import hospitalRoute from './Routes/hospitals.js'
import reviewRoute from './Routes/review.js';
import bookingRoute from './Routes/booking.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin:true
}

app.get('/', (req,res)=>{
    res.send('Api is working')
})

//databse connect
mongoose.set('strictQuery', false)
const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log('MongoDB database is connected')
    } catch (err) {
        console.log('MongoDB database connection failed')
    }
}

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute); //.../register or /login
app.use('/api/v1/users',userRoute); 
app.use('/api/v1/hospitals',hospitalRoute); 
app.use("api/v1/reviews", reviewRoute);
app.use("api/v1/bookings", bookingRoute);

app.listen(port, ()=>{
    connectDB()
    console.log('Server is runing on port'+port);
})