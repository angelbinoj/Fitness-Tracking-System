import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDatabase.js'; // Assuming this file is correct
import { indexRouter } from './routes/indexRouters.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

// Define a function to start the server only after the DB is ready
const startServer = async () => {
    try {
        // Await the database connection first
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

        // Only listen for connections AFTER the DB is connected
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server is running on port ${process.env.PORT || 8080}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        // Exit the process if DB connection fails
        process.exit(1); 
    }
};

// Call the async function to start everything
startServer();
