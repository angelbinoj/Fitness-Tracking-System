import mongoose, {Schema} from "mongoose";

const reviewSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, trim: true },
}, { timestamps: true });

export const ReviewDb = mongoose.model("Review", reviewSchema);
