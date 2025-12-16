import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const AdminReport = () => {
  const token = localStorage.getItem("token");
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [reviewsRes, notifRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/review/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/notification/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setReviews(reviewsRes.data.reviews || []);
        setNotifications(notifRes.data.notifications || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 space-y-8">

      <div className="bg-white border border-gray-300 rounded-2xl p-4 sm:p-6 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Client Reviews & Feedback
        </h2>

        {reviews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No reviews available.
          </div>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li
                key={r._id}
                className="border bg-green-50 dark:bg-slate-200 border-gray-200 rounded-lg p-3 sm:p-4 text-sm sm:text-base"
              >
                <p className="text-gray-800 flex gap-1">
                  <span className="font-semibold capitalize">Client:{" "}
                  {r.clientId?.name}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-semibold capitalize">Trainer:{" "}
                  {r.trainerId?.name}</span>
                </p>

                <div className="flex items-center gap-1 mt-1">
                  <span className="font-semibold text-gray-700">Rating:</span>
                  <span className="text-yellow-600 font-bold">
                    {r.rating}
                  </span>
                  <FaStar className="text-yellow-500" />
                </div>

                {r.comment && (
                  <p className="text-gray-600 mt-1">
                    “{r.comment}”
                  </p>
                )}

                <p className="text-xs text-gray-600 mt-2">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white border border-gray-300 rounded-2xl p-4 sm:p-6 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          System Activities & Notifications
        </h2>

        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No activities recorded.
          </div>
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n._id}
                className="border bg-green-50 dark:bg-slate-200 border-gray-200 rounded-lg p-3 sm:p-4 text-sm sm:text-base"
              >
                <p className="text-gray-700">
                  {n.message}
                </p>

                <p className="text-xs text-gray-600 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default AdminReport;
