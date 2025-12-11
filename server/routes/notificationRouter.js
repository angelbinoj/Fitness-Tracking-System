import express from "express";
import { authMiddleWare } from "../middlewares/authMiddlewares.js";
import { getNotifications, markAllAsRead } from "../controllers/notificationController.js";


const notificationRouter = express.Router();

notificationRouter.use(authMiddleWare);
notificationRouter.get("/", getNotifications);
notificationRouter.put("/markRead", markAllAsRead);

export default notificationRouter;
