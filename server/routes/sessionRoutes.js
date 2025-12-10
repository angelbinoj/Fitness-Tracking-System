import express from 'express';
import { authMiddleWare, authorizeRole } from '../middlewares/authMiddlewares.js';
import { cancelSession, createSession, getTrainerSessions, getUpcomingSessions, getUserSessions, updateSession, UserbookSession } from '../controllers/sessionController.js';

export const SessionRouter= express.Router();

SessionRouter.use(authMiddleWare);
SessionRouter.post('/trainer/create',authorizeRole(["trainer"]), createSession);
SessionRouter.get('/trainer',authorizeRole(["trainer"]), getTrainerSessions);
SessionRouter.put('/trainer/:id',authorizeRole(["trainer"]), updateSession);
SessionRouter.delete('/trainer/:id',authorizeRole(["trainer"]), cancelSession);
SessionRouter.post('/user/book',authorizeRole(["client"]), UserbookSession);
SessionRouter.get('/user',authorizeRole(["client"]), getUserSessions);
SessionRouter.get('/admin',authorizeRole(["admin"]), getUpcomingSessions);

