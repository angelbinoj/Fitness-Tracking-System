import { UserDb } from "../models/userModel.js";

export const findUsers =async(req,res)=>{
    try {
        const users = await UserDb.find({ role: "client" });
        if(users){
            return res.status(200).json({message:"Users fetched successfully",Users:users})
        }else{
            return res.status(400).json({error:error.message || "No user Found"})
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }

}

export const findTrainers =async(req,res)=>{
    try {
        const trainers = await UserDb.find({ role: "trainer" });
        if(trainers){
            return res.status(200).json({message:"Trainers fetched successfully",Trainers:trainers})
        }else{
            return res.status(400).json({error:error.message || "No Admin Found"})
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }

} 

// Approve Trainer
export const approveTrainer = async (req, res) => {
  try {
    const trainer = await UserDb.findById(req.params.id);
    if (!trainer) return res.status(404).json({ error: "Trainer not found" });

    trainer.status = "approved"; // update status
    await trainer.save();

    res.json({ message: "Trainer approved successfully", trainer });
  } catch (error) {
    res.status(500).json({ error:error.message || "Internal Server Error" });
  }
};


export const findAssignedClients = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const clients = await UserDb.find({
      role: "client",
       assignedTrainer: trainerId
    });
    if(!clients){
      return res.status(400).json({error:error.message || "No Clients Found!"})
    }else{

      res.status(200).json({
        message: "Assigned clients fetched successfully",AssignedClients:clients
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

