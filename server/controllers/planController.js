import { PlanDb } from "../models/plansModel.js";
import { UserDb } from "../models/userModel.js";



export const createPlan= async(req,res)=>{
    try {
        const {userId, workout, nutrition, duration} = req.body;
        if(!userId || !workout || !nutrition || !duration){
            return res.status(400).json({error:"All fields are required!"})
        }

        const user = await UserDb.findById(userId);
            if (!user) {
              return res.status(404).json({ error: "User not found!" });
            }

        const trainerId = req.user.id;
        if(user.assignedTrainer.toString() !== trainerId){
            return res.status(401).json({ error: "You are not assigned to this user!" });
        }    
        const Plan = new PlanDb({
            userId, trainerId, fitnessGoal: user.fitnessGoal, focusArea: user.focusArea, workout, nutrition, duration
        })
        await Plan.save();
        if(Plan){
            return res.status(200).json({message:"Workout Plan created successfully",Plan: Plan});
        }

    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

export const getUserPlan= async(req,res)=>{
    try {
        const user = await UserDb.findById(req.user.id);

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const plan = await PlanDb.findOne({ userId: user._id });
        if(!plan){
            return res.status(404).json({ error: "No plans assigned yet!" });
        }else{
             return res.status(200).json({Plan: plan});
        }
    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}