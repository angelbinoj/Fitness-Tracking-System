import express from 'express';
import { authMiddleWare, authorizeRole } from '../middlewares/authMiddlewares.js';
import { CreateBooking, getTrainerBookings } from '../controllers/bookingController.js';

export const bookingRouter= express.Router();

bookingRouter.use(authMiddleWare);
bookingRouter.post('/', authorizeRole(["client"]), CreateBooking);
bookingRouter.get('/trainer', authorizeRole(["trainer"]), getTrainerBookings);