import express from 'express';
import { authMiddleWare, authorizeRole } from '../middlewares/authMiddlewares.js';
import { createPlan, getUserPlan } from '../controllers/planController.js';

export const planRouter = express.Router();

planRouter.use(authMiddleWare);
planRouter.post("/:id",authorizeRole(["trainer"]), createPlan);
planRouter.get("/:id",authorizeRole(["client","trainer"]), getUserPlan);

