import express from'express';
import { authRouter } from './authRouter.js';
import { userRouter } from './userRoutes.js';
import { trainerRouter } from './trainerRoutes.js';
import { planRouter } from './planRoutes.js';
import { logRouter } from './logRoutes.js';
import { paymentRouter } from './paymentRoutes.js';
import { bookingRouter } from './bookingRoutes.js';
import { adminRouter } from './adminRoutes.js';
import { SessionRouter } from './sessionRoutes.js';
import notificationRouter from './notificationRouter.js';
import reviewRouter from './reviewRoutes.js';

export const indexRouter= express.Router();

indexRouter.use('/auth',authRouter);
indexRouter.use('/admin',adminRouter);
indexRouter.use('/user',userRouter);
indexRouter.use('/notification',notificationRouter);
indexRouter.use('/review',reviewRouter);
indexRouter.use('/trainer',trainerRouter);
indexRouter.use('/plan',planRouter);
indexRouter.use('/log',logRouter);
indexRouter.use('/payment',paymentRouter);
indexRouter.use('/booking',bookingRouter);
indexRouter.use('/session',SessionRouter);