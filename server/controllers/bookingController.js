import { BookingsDb } from "../models/bookingModel.js";
import { NotificationDb } from "../models/notificationModel.js";
import { UserDb } from "../models/userModel.js";




export const CreateBooking = async(req,res)=>{
    try {
        const clientId= req.user.id;
       const {trainerId} = req.body;

    const client = await UserDb.findById(clientId);
    if(!client){
        return res.status(404).json({ error: "Client not found!" });
    }
    if(client.role !== "client"){
        return res.status(404).json({ error: "Only Clients can make bookings" });
    }

    const trainer = await UserDb.findById(trainerId);
    if(!trainerId){
        return res.status(400).json({error:"Trainer ID is required!"})
    }
    if(trainer.role !== "trainer"){
        return res.status(404).json({ error: "Selected user is not a trainer" });
    }

    if(client.assignedTrainer){
        return res.status(400).json({error:"You already have an assigned trainer!"})
    }

    const booking = new BookingsDb({clientId,trainerId});

    await booking.save();

    if(!client.assignedTrainer){
       client.assignedTrainer = trainerId; 
      }
        if (!trainer.assignedClients.includes(client._id))
           { trainer.assignedClients.push(client._id); } 
        await client.save();
         await trainer.save(); 

         await NotificationDb.create({
    userId: trainer._id,
    message: `New booking request from ${client.name}`,
    type: "booking"
});

    res.status(201).json({message: "Booking request sent",booking});


    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }

}


export const getTrainerBookings = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const bookings = await BookingsDb.find({ trainerId })
      .populate("clientId", "name profilePic goal");

    if (bookings.length === 0) {
      return res.json({ message: "No bookings found!" });
    }

    res.status(200).json({ message: "Successfully fetched bookings", bookings });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};