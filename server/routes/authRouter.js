import express from'express';
import { UserLogin, UserLogout, UserRegister, UserInfo, forgotPassword, resetPassword  } from '../controllers/authController.js';
import { upload } from '../config/cloudinaryConfig.js';


export const authRouter= express.Router();

authRouter.post('/register',upload.single('profilePic'), UserRegister);
authRouter.post('/login',UserLogin);
authRouter.put('/Updatedetails/:id', upload.array('certifications'), UserInfo);
authRouter.post('/logout',UserLogout);
authRouter.post('/forgotPassword', forgotPassword);
authRouter.post('/resetPassword/:token', resetPassword);

