import mongoose, {Schema} from "mongoose";

const SessionSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  dateTime: { type: Date, required: true },
  duration: { type: Number, default: 60 },
  status: {
    type: String,
    enum: ['Upcoming', 'Completed'],
    default: 'Upcoming'
  },
  createdAt: { type: Date, default: Date.now }
});

export const SessionsDb = mongoose.model("Session",SessionSchema);