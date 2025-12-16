import mongoose, {Schema} from "mongoose";

const withdrawalSchema =  new mongoose.Schema({
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "success",
  },
}, { timestamps: true });

export const WithdrawalDb = mongoose.model("Withdrawal", withdrawalSchema);
