import { UserLogDb } from "../models/logsModel.js";
import { UserDb } from "../models/userModel.js";



export const  CreateUserLogs= async(req,res)=>{
    try {
        const {trainerId, logs} = req.body;
            if(!trainerId || !logs){
                return res.status(400).json({error:"All fields are required!"})
            }
    
            const trainer = await UserDb.findById(trainerId);
                if (!trainer) {
                  return res.status(404).json({ error: "Trainer not found!" });
                }
    const userId = req.user.id;
    const newLogs = Array.isArray(logs) ? logs : [logs];
    let userLog= await UserLogDb.findOne({ userId });
    if (userLog) {
      newLogs.forEach(log => {
        userLog.logs.push(log);
      });
      await userLog.save();
    }else{
         userLog = new UserLogDb({userId, trainerId, logs: newLogs})
         await userLog.save();
    }
            
            if(userLog){
                return res.status(200).json({message:"Daily workout and nutrition logged successfully",LogDetails: userLog});
            }
    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

export const getUserLogsList= async(req,res)=>{
    try {
    const user = await UserDb.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const logs= await UserLogDb.findOne({ userId: user._id });
    if(!logs){
        return res.status(404).json({error:"No logs found!"})
    }else{
    return res.status(200).json({message:"User logs fetched successfully",Logs: logs});
    }
  } catch (error) {
    res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
  }

}
    
export const getUsersWithLogs= async(req,res)=>{
    try {
    const trainerId = req.user.id;
    const logs = await UserLogDb.find({ trainerId })
    if(logs.length === 0){
        return res.status(404).json({error:"No logs found!"})
    }else{
    return res.status(200).json({message:"Logs fetched successfully",Logs: logs});
    }
  } catch (error) {
    res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
  }

}

export const getUserLogs= async(req,res)=>{
    try {
      const userId= req.params.id;
      const log= await UserLogDb.findOne({userId})
      if(!log){
        return res.status(404).json({error:"No logs found from this user!"})
      }

      const trainerId = req.user.id;
      if(log.trainerId.toString() !== trainerId){
        return res.status(401).json({error:"You are not assigned to this user!"})
      }
    return res.status(200).json({message:"User Log fetched successfully",Log: log});
    
  } catch (error) {
    res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
  }

}