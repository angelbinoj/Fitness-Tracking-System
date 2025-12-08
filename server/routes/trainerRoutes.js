import express from 'express';
import { getProfile, getProfileById, updateProfile } from '../controllers/profileController.js';
import { findAssignedClients } from '../controllers/userController.js';
import { authMiddleWare, authorizeRole, isClientAssignedToTrainer} from '../middlewares/authMiddlewares.js';
import { upload } from '../config/cloudinaryConfig.js';

export const trainerRouter= express.Router();

trainerRouter.use(authMiddleWare);
trainerRouter.use(authorizeRole(["trainer"]));
// trainerRouter.get('/dashboard', TrainerDashboard);
trainerRouter.get('/profile',getProfile);
trainerRouter.put('/profile',upload.single('profilePic'), updateProfile);
trainerRouter.get('/clients',findAssignedClients);
trainerRouter.get('/client/:id',isClientAssignedToTrainer, getProfileById);
// trainerRouter.get('/progress/:clientId',UserProgress);