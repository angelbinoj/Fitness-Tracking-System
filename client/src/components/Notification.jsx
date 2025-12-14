import axios from "axios";
import { useState, useEffect } from "react";
import { IoNotificationsSharp } from "react-icons/io5";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/notification`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const data = res.data;
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = async () => {
    setOpen(!open);
    if (unreadCount > 0) {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/notification/markRead`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setUnreadCount(0);
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative inline-block">
      <button onClick={handleOpen} className="relative">
        <IoNotificationsSharp className="w-10 h-10 text-[#f7d600] hover:text-[#e8c600] transition" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No notifications
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
                  n.isRead 
                    ? "bg-white dark:bg-gray-800" 
                    : "bg-blue-50 dark:bg-blue-900/20"
                }`}
              >
                <div className="text-sm text-gray-900 dark:text-gray-100 mb-1">
                  {n.message}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}