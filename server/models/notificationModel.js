import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    type: { type: String },   // e.g. "booking", "payment", "log", "registration"
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const NotificationDb = mongoose.model("Notification", NotificationSchema);
