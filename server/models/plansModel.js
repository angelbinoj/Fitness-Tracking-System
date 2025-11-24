import mongoose, {Schema} from "mongoose";

const PlanSchema= new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fitnessGoal: String,
    focusArea: [String],
    duration: String,
    workout: {
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        rest: String,
      }
    ],
    totalCaloriesBurned: { type: Number, default: 0 },
  },
  nutrition: {
    meals: [
      {
        meal: String,
        foods: [
          {
            item: String,
            calories: Number,
            protein: Number,
            carbs: Number,
            fats: Number,
          }
        ]
      }
    ],
    totalCalories: { type: Number, default: 0 },
  },
    createdAt: { type: Date, default: Date.now },
},{timestamps : true})


export const PlanDb = mongoose.model("Plan",PlanSchema);