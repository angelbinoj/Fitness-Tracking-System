import { NotificationDb } from "../models/notificationModel.js";
import { SessionsDb } from "../models/sessionModel.js";
import { UserDb } from "../models/userModel.js";


export const createSession = async (req, res) => {
  try {
    const { date, time, title, duration } = req.body;
    if (!date || !time || !title) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const trainerId = req.user.id;

    // Convert to UTC to avoid timezone issues
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    const session = new SessionsDb({ trainerId, title, dateTime, duration });
    await session.save();

    return res.status(201).json({
      message: "Session created successfully!",
      Session: session
    });

  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const updateSession = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const sessionId = req.params.id;

    const session = await SessionsDb.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "No session found!" });
    }

    if (session.trainerId.toString() !== trainerId) {
      return res.status(404).json({ error: "You have no access to update this session!" });
    }

    if (session.status === "Completed") {
      return res.status(400).json({ error: "Cannot update a completed session!" });
    }

    const updatedData = { ...req.body };

    if (updatedData.date && updatedData.time) {
      const [year, month, day] = updatedData.date.split('-').map(Number);
      const [hours, minutes] = updatedData.time.split(':').map(Number);
      updatedData.dateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    }

    await SessionsDb.findByIdAndUpdate(sessionId, updatedData, { new: true });

    res.json({
      message: "Session updated successfully!",
    });

  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};


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

export const UserbookSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.body;

    const session = await SessionsDb.findById(sessionId);
    if (!session) return res.status(404).json({ error: "Session not found!" });

    if (!session.bookedUsers){
        session.bookedUsers = [];
    } 

    if (session.bookedUsers.includes(userId)){
        return res.status(400).json({ error: "Already booked!" });
    }

    session.bookedUsers.push(userId);
    await session.save();

    const user = await UserDb.findById(userId);

    await NotificationDb.create({
    userId: session.trainerId,
    message: `${user.name} booked your session: ${session.title}`,
    type: "booking"
});

    res.status(201).json({ message: "Session booked successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

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

export const getUpcomingSessions = async (req, res) => {
  try {
    const sessions = await SessionsDb.find({
      status: "Upcoming"
    })
      .populate("trainerId", "name")

    if (!sessions.length) {
      return res.status(200).json({
        message: "No upcoming sessions",
        Sessions: []
      });
    }

    return res.status(200).json({
      message: "Upcoming Sessions fetched successfully!",
      Sessions: sessions
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || "Internal Server Error"
    });
  }
};


