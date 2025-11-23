import mongoose, {Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
  // Basic Info (common for both)
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  age:{ type: Number, required: true },
  gender: { type: String, required: true },
  profilePic: { type: String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"},

  role: {
    type: String,
    enum: ["client", "trainer", "admin"],
    default: "client",
  },

  // Client Profile Info
  fitnessGoal: { type: String, enum: ["gain", "lose", "maintain", 'rehabilation'] },
  focusArea: [String], // ["Abs", "Glutes"]
  profileMetrics: {
    height: Number,
    weight: Number,
  },
  healthIssues: String,

  // Trainer Info
  trainerInfo: {
    specialization: String,
    experience: Number,
    certifications: [String],
    availability: String,
  },
  
  assignedTrainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  assignedClients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  createdAt: { type: Date, default: Date.now },
});

export const UserDb = mongoose.model("User",UserSchema);
