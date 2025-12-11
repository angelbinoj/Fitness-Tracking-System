import express from 'express';
import { getProfile, getProfileById, updateProfile } from '../controllers/profileController.js';
import { approveTrainer, findTrainers, findUsers } from '../controllers/userController.js';
import { authMiddleWare, authorizeRole } from '../middlewares/authMiddlewares.js';
import { upload } from '../config/cloudinaryConfig.js';

export const adminRouter= express.Router();

adminRouter.use(authMiddleWare);
adminRouter.use(authorizeRole(["admin"]));
adminRouter.get('/profile',getProfile);
adminRouter.put('/profile', upload.single('profilePic'), updateProfile);
adminRouter.get("/users", findUsers);
adminRouter.get("/user/:id", getProfileById);
adminRouter.get("/trainers", findTrainers);
adminRouter.get("/trainer/:id", getProfileById);
adminRouter.put("/trainer/:id/approve", approveTrainer);