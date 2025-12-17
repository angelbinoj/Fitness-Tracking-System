import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDatabase.js'; 
import { indexRouter } from './routes/indexRouters.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();


const startServer = async () => {
    try {
        await connectDB(); 

        const app = express();
        app.use(express.json());
        app.use(cookieParser());
        
        const allowOrigins = ['http://localhost:5173','https://fitness-system-frontend.vercel.app'];

        app.use(cors({
            origin: function (origin, callback) {
                if (!origin) return callback(null, true);
                if (allowOrigins.includes(origin)) {
                    return callback(null, true);
                } else {
                    return callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }));

        app.use('/api', indexRouter);

        app.use('/', (req, res) => {
            res.send("<h1>Welcome to User API</h1>");
        });

        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server is running on port ${process.env.PORT || 8080}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
