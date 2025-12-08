import mongoose from "mongoose";

const UserLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  logs: [
    {
      date: { type: String, required: true },

      workout: { 
        description: String,    
        caloriesBurned: Number   
      },

     nutrition: {
  meals: [
    {
      mealType: String,
      description: String,
      calories: Number
    }
  ],
  totalCalories: Number
},
      energyLevel: String,           
      notes: String  
    }
  ]
}, { timestamps: true });

export const UserLogDb = mongoose.model("UserLog", UserLogSchema);
