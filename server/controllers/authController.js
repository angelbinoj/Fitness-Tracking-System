import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDb } from "../models/userModel.js";





export const UserRegister =async(req,res)=>{
    try {
        const {name,email,contact,age,gender,password,confirmPassword} = req.body;

        if(!name || !email || !contact || !age || !gender || !password || !confirmPassword){
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
          name,email,contact,age,gender,password: hashedPassword, profilePic
        });
        await user.save()
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
