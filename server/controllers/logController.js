import { UserLogDb } from "../models/logsModel.js";
import { NotificationDb } from "../models/notificationModel.js";
import { UserDb } from "../models/userModel.js";


export const createOrUpdateLog = async (req, res) => {
  try {
    const { trainerId, workout, nutrition, energyLevel, notes } = req.body;
    const userId = req.user.id;
    const userName = await UserDb.find({ userId })
          .populate("name");

    if (!workout || !nutrition) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const meals = nutrition.meals || [];
    const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);

    const nutritionWithTotal = {
      ...nutrition,
      totalCalories,
    };

    const today = new Date().toISOString().split("T")[0];

    let userLog = await UserLogDb.findOne({ userId });

    if (userLog) {
      const existingLog = userLog.logs.find((log) => log.date === today);

      if (existingLog) {
        existingLog.workout = workout;
        existingLog.nutrition = nutritionWithTotal;
        existingLog.energyLevel = energyLevel;
        existingLog.notes = notes;
      } else {
        userLog.logs.push({
          date: today,
          workout,
          nutrition: nutritionWithTotal,
          energyLevel,
          notes,
        });
      }

      await userLog.save();
      await NotificationDb.create({
        userId: trainerId,
        message: `${userName} added/updated a workout log today.`,
        type: "log"
    });

      return res
        .status(200)
        .json({ message: "Today's log saved successfully", userLog });
    }

    const newLog = new UserLogDb({
      userId,
      trainerId,
      logs: [
        {
          date: today,
          workout,
          nutrition: nutritionWithTotal,
          energyLevel,
          notes,
        },
      ],
    });

    await newLog.save();
    await NotificationDb.create({
        userId: trainerId,
        message: `${userName} added/updated a workout log today.`,
        type: "log"
    });

    return res
      .status(200)
      .json({ message: "Log created successfully", userLog: newLog });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};


export const getUserLogsList = async (req, res) => {
  try {
    const userId = req.user.id;
    const logs = await UserLogDb.findOne({ userId });

    if (!logs) {
      return res.status(404).json({ error: "No logs found" });
    }

    return res.status(200).json({ message: "Logs fetched successfully", logs });

  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getUsersWithLogs = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const logs = await UserLogDb.find({ trainerId });

    if (logs.length === 0) {
      return res.status(404).json({ error: "No logs found!" });
    }

    return res.status(200).json({ message: "Logs fetched successfully", logs });

  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getUserLogs = async (req, res) => {
  try {
    const userId = req.params.id;
    const log = await UserLogDb.findOne({ userId });

    if (!log) {
      return res.status(404).json({ error: "No logs found from this user!" });
    }

    const trainerId = req.user.id;
    if (log.trainerId.toString() !== trainerId) {
      return res.status(401).json({ error: "You are not assigned to this user!" });
    }

    return res.status(200).json({ message: "User Log fetched successfully", log });

  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
