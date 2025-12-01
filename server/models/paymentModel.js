import mongoose, {Schema} from "mongoose";

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    plan: { type: String, enum: ["Monthly", "Quarterly", "Yearly"], required: true },

    amount: { type: Number, required: true },
    platformCommission: Number,
    trainerShare: Number,

    paymentMethod: { type: String, default: "Stripe" },
    transactionId: String,

    paymentStatus: {
        type: String,
        enum: ["Success", "Failed", "Pending"],
        default: "Pending"
    },

    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },

}, { timestamps: true });

export const PaymentDb = mongoose.model("Payment", PaymentSchema);
