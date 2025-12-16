import express from 'express';
import { authMiddleWare, authorizeRole } from '../middlewares/authMiddlewares.js';
import {createCheckoutSession, getAllPayments, getTrainerPayments, getTrainerWithdrawals, getUserPayments, updatePayment, withdrawAmount } from '../controllers/paymentController.js';

export const paymentRouter= express.Router();

paymentRouter.use(authMiddleWare);
paymentRouter.post('/makePayment',authorizeRole(["client"]), createCheckoutSession);
paymentRouter.post("/update",authorizeRole(["client"]), updatePayment);
paymentRouter.get('/userPayments',authorizeRole(["client"]), getUserPayments);
paymentRouter.get('/trainerPayments',authorizeRole(["trainer"]), getTrainerPayments);
paymentRouter.get('/allPayments',authorizeRole(["admin"]), getAllPayments);
paymentRouter.post('/withdraw',authorizeRole(["trainer"]), withdrawAmount);
paymentRouter.get('/allWithdrawals',authorizeRole(["trainer"]), getTrainerWithdrawals);