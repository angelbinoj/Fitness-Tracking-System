import mongoose, {Schema} from "mongoose";

const PlanSchema= new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fitnessGoal: {type: String},
    focusArea: [String],
    duration: String,
    workout: [
  {
    day: String, 
    exerciseType: String,
    exercises: {
      type: [String],
      default: ["No exercises scheduled today."]
    },
    caloriesBurned: { type: Number, default: 0 }
  }
],

 nutrition: {
    targetCaloriesPerDay: Number,
    meals: [
      {
        _id: false,
        mealType: String, // Breakfast, Lunch, Dinner, Snacks
        options: [
          {
            _id: false,
            item: String,
            calories: Number,
            protein: Number,
            carbs: Number,
            fats: Number,
          }
        ]
      }
    ]
  },
    createdAt: { type: Date, default: Date.now },
},{timestamps : true})


export const PlanDb = mongoose.model("Plan",PlanSchema);