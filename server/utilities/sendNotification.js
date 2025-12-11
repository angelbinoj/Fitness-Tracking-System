import { NotificationDb } from "../models/notificationModel";


export const sendNotification = async (userId, message, type) => {
    try {
        const notify = new NotificationDb({
            userId,
            message,
            type
        });

        await notify.save();
        return notify;
    } catch (error) {
        console.error("Notification Error:", error);
    }
};
