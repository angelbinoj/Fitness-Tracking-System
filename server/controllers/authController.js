import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDb } from "../models/userModel.js";
import crypto from 'crypto';;
import { transporter } from '../utilities/nodemailer.js';
import { NotificationDb } from "../models/notificationModel.js";





export const UserRegister =async(req,res)=>{
    try {
        const {name,email,contact,age,role,gender,password,confirmPassword} = req.body;

        if(!name || !email || !role || !contact || !age || !gender || !password || !confirmPassword){
            return res.status(400).json({error:"All fields are required!"})
        }

        
        if(password !== confirmPassword){
          return res.status(400).json({error:"Passwords does not match!"})
        }
        
        const hashedPassword= await bcrypt.hash(password,12)
        
        
        const userExist = await UserDb.findOne({email});
        if(userExist){
          return res.status(400).json({error:"Email already exists!"})
        }
        const profilePic = req.file ? req.file.path : undefined;


        const user= new UserDb({
          name,email,contact,age,gender,role, password: hashedPassword, profilePic, status: role === "trainer" ? "pending" : "approved"
        });
        await user.save();

        // Send notification to admin when a new user registers
const admins = await UserDb.find({ role: "admin" }, "_id");

if (admins.length > 0) {
  const notifications = admins.map(admin => {
    const userType = user.role === "trainer" ? "trainer" : "client";
    return {
      userId: admin._id,
      message: `New ${userType} registered: ${user.name}`,
      type: "registration"
    };
  });

  await NotificationDb.insertMany(notifications);
}

        if(user){
            return res.status(200).json({message:"User created successfully",User:user})
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }

}


export const UserLogin =async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password ){
            return res.status(400).json({error:"Email and Password required!"})
        }

        const user= await UserDb.findOne({email})
        if(!user){
            return res.status(400).json({error:"User not found!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error:"Incorrect Password!"})
        }

        const data = {
          email: user.email,
          role: user.role,
          id: user._id
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie("token",token)
    return res.status(200).json({message:"User login successfull!", User: user,token:token})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}   

export const UserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserDb.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const updatedData = req.body;
    if (req.files && req.files.length > 0) {
      updatedData.trainerInfo = updatedData.trainerInfo || {};
      updatedData.trainerInfo.certifications = req.files.map((file, index) => ({
        file: file.path,
        description: req.body[`description_${index}`]
      }));
    }

    const updatedUser = await UserDb.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Details updated successfully!",
      user: updatedUser
    });

  } catch (error) {
    res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
  }
};

export const UserLogout = async (req, res) => {
  try {
    res.clearCookie("token")
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await UserDb.findOne({ email });
  if (!user) return res.status(404).json({message:'User not found'});

  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/resetPassword/${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset your password',
    html: `<p>Reset: <a href="${resetLink}">${resetLink}</a></p>`
  });

  res.json({message:'Reset link sent'});
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  const user = await UserDb.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) return res.status(400).json({message:'Invalid/expired token'});
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({message:'Password updated'});
};
