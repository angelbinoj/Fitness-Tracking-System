import { ReviewDb } from "../models/reviewModel.js";
import { NotificationDb } from "../models/notificationModel.js";
import { UserDb } from "../models/userModel.js";

export const createReview = async (req, res) => {
  try {
    const { trainerId, rating, comment } = req.body;
    const clientId = req.user.id;

      const client = await UserDb.findById(clientId);
      const trainer = await UserDb.findById(trainerId);

    const review = await ReviewDb.create({ clientId, trainerId, rating, comment });

    await NotificationDb.create({
      userId: trainerId,
      message: `${client.name} has added a rating of ${rating}`,
      type: "review",
    });

    const admins = await UserDb.find({ role: "admin" }, "_id");
    if (admins.length > 0) {
      const adminNotifications = admins.map(admin => ({
        userId: admin._id,
        message: `New review from ${client.name} for ${trainer.name}: ${rating}`,
        type: "review",
      }));
      await NotificationDb.insertMany(adminNotifications);
    }

    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getTrainerReviews = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const reviews = await ReviewDb.find({ trainerId })
      .sort({ createdAt: -1 })
      .populate("clientId", "name");
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {

    const reviews = await ReviewDb.find()
      .sort({ createdAt: -1 })                 
      .populate("clientId", "name") 
      .populate("trainerId", "name"); 

    res.status(200).json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getLatestReviews = async (req, res) => {
  try {

    const reviews = await ReviewDb.find()
      .sort({ createdAt: -1 })   
      .limit(5)                  
      .populate("clientId", "name") 
      .populate("trainerId", "name"); 

    res.status(200).json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};