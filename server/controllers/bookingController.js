import { BookingsDb } from "../models/bookingModel.js";
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

    res.status(201).json({message: "Booking request sent",booking});


    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }

}


export const getTrainerBookings = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const bookings= await BookingsDb.find({ trainerId ,status: "Pending"})
      .populate("clientId", "name profilePic goal");

    if(bookings.length === 0){
        res.json({message: "No pending bookings found!"})
    }else{
         res.status(200).json({message: "Successfully fetched pending bookings", bookings});
    }

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const id  = req.params.id;
    const trainerId= req.user.id;

    const booking = await BookingsDb.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.trainerId.toString() !== trainerId) {
      return res.status(403).json({ error: "Not authorized for this booking" });
    }

    booking.status = status;
    await booking.save();

    if (status === "Accept") {
      const client = await UserDb.findById(booking.clientId);
      const trainer = await UserDb.findById(booking.trainerId);

      if (client && trainer) {
        if(!client.assignedTrainer){
            client.assignedTrainer = trainerId;
        }

        if (!trainer.assignedClients.includes(client._id)) {
          trainer.assignedClients.push(client._id);
        }

        await client.save();
        await trainer.save();
      }
    }

    res.json({ message: "Booking updated", booking });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 