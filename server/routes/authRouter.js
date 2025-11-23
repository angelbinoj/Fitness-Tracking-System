import express from'express';
import { UserLogin, UserLogout, UserRegister, UserInfo  } from '../controllers/authController.js';
import { upload } from '../config/cloudinaryConfig.js';


export const authRouter= express.Router();

authRouter.post('/register',upload.single('profilePic'), UserRegister);
authRouter.post('/login',UserLogin);
authRouter.put('/Updatedetails/:id',UserInfo);
authRouter.post('/logout',UserLogout);
