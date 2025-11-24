import { SessionsDb } from "../models/sessionModel.js";
import { UserDb } from "../models/userModel.js";




export const createSession = async(req,res)=>{
    try {
        const {date, time, title, duration} = req.body;
        if(!date || !time || !title){
            return res.status(400).json({error:"All fields are required!"})
        }
        const trainerId =req.user.id;
        const dateTimeString = `${date}T${time}:00`;
        const dateTime = new Date(dateTimeString);

        const session = new SessionsDb({trainerId,title,dateTime,duration});
        await session.save();
        if(session){
            return res.status(201).json({message: "Session created successfully!", Session: session});
        }
    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

export const getTrainerSessions = async(req,res)=>{
    try {
        const trainerId= req.user.id;

        const session = await SessionsDb.find({trainerId});
        if(session.length === 0){
            return res.status(400).json({ error: "No sessions found!" });
        }
    
        return res.status(201).json({message: "Sessions fetched successfully!", Sessions: session});
    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

export const updateSession = async (req, res) => {
  try {
    const trainerId= req.user.id;
    const sessionId = req.params.id;
    const session = await SessionsDb.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "No session found!" });
    }
    if(session.trainerId.toString() !== trainerId){
        return res.status(404).json({ error: "You have no access to update this session!" });
    }
    if(session.status === "Completed"){
    return res.status(400).json({ error: "Cannot update a completed session!" });
}

    const updatedData = req.body;
    const { date, time } = updatedData;
if (date && time) {
  session.dateTime = new Date(`${date}T${time}:00`);
}
     await SessionsDb.findByIdAndUpdate(
      sessionId,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Session updated successfully!",
    });

  } catch (error) {
    res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
  }
};

export const cancelSession = async(req,res)=>{
    try {
        const trainerId= req.user.id;
        const sessionId= req.params.id;

        const session = await SessionsDb.findById(sessionId);
        if(session.trainerId.toString() !== trainerId){
            return res.status(404).json({ error: "You have no access to delete this session!" });
        }
        await SessionsDb.findByIdAndDelete(sessionId);
        return res.status(201).json({message: "Session cancelled!"});
    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

export const getUserSessions = async(req,res)=>{
    try {
        const userId= req.user.id;
        const user= await UserDb.findById(userId);
        const trainerId = user.assignedTrainer;
        const session = await SessionsDb.find({trainerId});
        if(session.length === 0){
    return res.status(400).json({ error: "No sessions found!" });
}
    
        return res.status(201).json({message: "Sessions fetched successfully!", Sessions: session});
    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

export const getUpcomingSessions = async(req,res)=>{
    try {
        const sessions = await SessionsDb.find({
      status: 'Upcoming'
    }).sort({ dateTime: 1 });

       if(sessions.length === 0){
    return res.status(400).json({ error: "No sessions found!" });
}
    
        return res.status(201).json({message: "Upcoming Sessions fetched successfully!", Sessions: sessions});
    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

