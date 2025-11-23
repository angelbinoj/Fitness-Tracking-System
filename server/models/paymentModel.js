import mongoose, {Schema} from "mongoose";

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer" },
    amount: Number,
    paymentMethod: String,
    transactionId: String,
    paymentStatus: {
        type: String,
        enum: ["Success", "Failed", "Pending"],default: "Success"
    },
    paymentDate: { type: Date, default: Date.now }
}, { timestamps: true });

export const PaymentDb = mongoose.model("Payment", PaymentSchema);
