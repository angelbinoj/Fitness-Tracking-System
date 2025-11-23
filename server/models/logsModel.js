import mongoose, {Schema} from "mongoose";

const UserLogSchema= new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  logs: [
    {
      date: { type: Date, default: Date.now },

      workout: {
        exercises: [
          {
            name: String,
            sets: Number,
            reps: Number
          }
        ],
        totalCaloriesBurned: { type: Number, default: 0 }
      },

      nutrition: {
        meals: [
          {
            meal: String,
            foods: [
              {
                item: String, 
                totalCalories: Number
              }
            ]
          }
        ],
        totalCalories: { type: Number, default: 0 }
      }
    }
  ]
}, { timestamps: true });

export const UserLogDb = mongoose.model("UserLog",UserLogSchema);