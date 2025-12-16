import express from "express";
import { authMiddleWare } from "../middlewares/authMiddlewares.js";
import { createChatNotification, getAllNotifications, getNotifications, markAllAsRead } from "../controllers/notificationController.js";


const notificationRouter = express.Router();

notificationRouter.use(authMiddleWare);
notificationRouter.get("/", getNotifications);
notificationRouter.get("/all", getAllNotifications);
notificationRouter.put("/markRead", markAllAsRead);
notificationRouter.post("/create", createChatNotification);

export default notificationRouter;
