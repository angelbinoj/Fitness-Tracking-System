import express from 'express';
import { findTrainers } from '../controllers/userController.js';
import { getProfile, getProfileById, updateProfile } from '../controllers/profileController.js';
import { authMiddleWare, authorizeRole } from '../middlewares/authMiddlewares.js';
import { upload } from '../config/cloudinaryConfig.js';
import { getClientProgress } from '../controllers/progressController.js';

export const userRouter = express.Router();

userRouter.use(authMiddleWare);
userRouter.use(authorizeRole(["client"]));
userRouter.get('/profile',getProfile);
userRouter.put('/profile', upload.single('profilePic') ,updateProfile);
userRouter.get('/trainers',findTrainers);
userRouter.get('/trainer/:id', getProfileById);
userRouter.get('/progress',getClientProgress);
