import { PlanDb } from "../models/plansModel.js";
import { UserLogDb } from "../models/logsModel.js";
import { PaymentDb } from "../models/paymentModel.js";
import { UserDb } from "../models/userModel.js";

export const getClientProgress = async (req, res) => {
  try {

    const clientId = req.user.id;
  const plan = await PlanDb.findOne({ userId: clientId });

  if (!plan) {
    return res.status(404).json({ message: "No plan found" });
  }

  const targetCalories = plan.nutrition?.targetCaloriesPerDay || 0;

  const userLog = await UserLogDb.findOne({ userId: clientId });

  if (!userLog || userLog.logs.length === 0) {
    return res.json({
      labels: [],
      actual: [],
      target: targetCalories
    });
  }
  const labels = [];
  const actual = [];

  userLog.logs.forEach(log => {
    labels.push(log.date);
    actual.push(log.nutrition?.totalCalories || 0);
  });

  res.json({
    labels,
    actual,
    target: targetCalories
  });

  } catch (error) {
    console.log(error);
    
  }
};


export const getTrainerProgress = async (req, res) => {
  try {
    
    const trainerId = req.user.id;
  const progress = {};

  // Earnings
  const payments = await PaymentDb.find({
    trainerId,
    paymentStatus: "Success"
  });

  payments.forEach(p => {
    const month = p.createdAt.toISOString().slice(0, 7);
    if (!progress[month]) {
      progress[month] = { earnings: 0, clients: 0 };
    }
    progress[month].earnings += p.trainerShare || 0;
  });

  // Clients
  const clients = await UserDb.find({
    assignedTrainer: trainerId,
    role: "client"
  });

  clients.forEach(c => {
    const month = c.createdAt.toISOString().slice(0, 7);
    if (!progress[month]) {
      progress[month] = { earnings: 0, clients: 0 };
    }
    progress[month].clients += 1;
  });

  res.json({
    labels: Object.keys(progress),
    earnings: Object.values(progress).map(p => p.earnings),
    clients: Object.values(progress).map(p => p.clients),
  });

  } catch (error) {
    console.log(error);
    
  }
};


export const getAdminProgress = async (req, res) => {
  try {
    const progress = {}; 


  const users = await UserDb.find({ role: { $ne: "admin" } });

  users.forEach(user => {
    const month = user.createdAt.toISOString().slice(0, 7);
    if (!progress[month]) {
      progress[month] = { users: 0, earnings: 0 };
    }
    progress[month].users += 1;
  });

  const payments = await PaymentDb.find({
    paymentStatus: "Success"
  });

  payments.forEach(payment => {
    const month = payment.createdAt.toISOString().slice(0, 7);
    if (!progress[month]) {
      progress[month] = { users: 0, earnings: 0 };
    }
    progress[month].earnings += payment.platformCommission || 0;
  });

  res.json({
    labels: Object.keys(progress),
    users: Object.values(progress).map(p => p.users),
    earnings: Object.values(progress).map(p => p.earnings)
  });

  } catch (error) {
    console.log(error);
    
  }
};
