import mongoose, {Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
  // Basic Info (common for both)
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
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
  fitnessGoal: { type: String, enum: ["gain", "lose", "maintain", 'rehabilitation'] },
  focusArea: [String], // ["Abs", "Glutes"]
  profileMetrics: {
    height: Number,
    weight: Number,
  },
  healthIssues: {type: String},

  // Trainer Info
  trainerInfo: {
    specialization: {type: String},
    experience: {type: String},
     certifications: [
    {
      file: String,
      description: String
    }
  ],
    availability: {type: String},
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
