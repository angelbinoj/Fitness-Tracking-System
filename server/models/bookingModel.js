import mongoose, {Schema} from "mongoose";

const BookingSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer" },
    date: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["Accept", "Pending", "Reject"],
        default: "Pending"
    }
},{ timestamps: true });

export const BookingsDb = mongoose.model("Booking",BookingSchema);
