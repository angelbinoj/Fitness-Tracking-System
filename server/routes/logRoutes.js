import express from 'express';
import { authMiddleWare, authorizeRole } from '../middlewares/authMiddlewares.js';
import { createOrUpdateLog, getUserLogs, getUserLogsList, getUsersWithLogs } from '../controllers/logController.js';

export const logRouter= express.Router();

logRouter.use(authMiddleWare);
logRouter.post("/",authorizeRole(["client"]), createOrUpdateLog);
logRouter.get("/",authorizeRole(["client"]), getUserLogsList);
logRouter.get("/trainer/users",authorizeRole(["trainer"]), getUsersWithLogs);
logRouter.get("/trainer/user/:id",authorizeRole(["trainer"]), getUserLogs);