import express from 'express';
import { authMiddleWare, authorizeRole } from '../middlewares/authMiddlewares.js';
import { createCheckoutSession } from '../controllers/paymentController.js';

export const paymentRouter= express.Router();

paymentRouter.use(authMiddleWare);
paymentRouter.post('/makePayment',authorizeRole(["client"]), createCheckoutSession);
// paymentRouter.get('/payments',getPayments);