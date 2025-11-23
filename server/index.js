import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDatabase.js';
import { indexRouter } from './routes/indexRouters.js';
// import { authRouter } from './routes/userRoutes.js';
// import { taskRouter } from './routes/taskRoutes.js';
// import { globalErrorHandler } from './middlewares/errorMiddlewares.js';
// import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB()

const app=express();
app.use((express.json()));
app.use(cookieParser());
// const allowOrigins = ['http://localhost:5173','https://mern-task-manager-frontend-pearl.vercel.app']

// // app.use(cors({
//     origin: function (origin, callback) {

//         if (!origin) return callback(null, true)

//         if (allowOrigins.includes(origin)) {
//             return callback(null, true)
//         } else {
//             return callback(new Error('Not allowed by CORS'))
//         }
// },credentials: true
// }))

app.use('/api',indexRouter);
// app.use('/api/tasks',taskRouter);

app.use('/',(req,res)=>{
    res.send("<h1>Welcome to User API</h1>");
})

// app.use(globalErrorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
    
})

