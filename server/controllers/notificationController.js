import { NotificationDb } from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const notifications = await NotificationDb.find({ userId })
            .sort({ createdAt: -1 })
            .limit(10);

        const unreadCount = await NotificationDb.countDocuments({
            userId,
            isRead: false
        });

        return res.status(200).json({
            notifications,
            unreadCount
        });

    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};


export const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;

        await NotificationDb.updateMany(
            { userId, isRead: false },
            { $set: { isRead: true } }
        );

        return res.status(200).json({ message: "Notifications marked as read" });

    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

