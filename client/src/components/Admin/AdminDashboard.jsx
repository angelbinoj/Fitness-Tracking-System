import axios from "axios";
import Notification from "../Notification";
import { useEffect, useState } from "react";
import AdminProgressChart from "./AdminProgressChart";
import MiniCalendar from "../MiniCalendar";
import { IoStar } from "react-icons/io5";

function AdminDashboard() {
   const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [clients, setClients] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [reviews, setReviews] = useState([]); // ✅ NEW

  const [chartData, setChartData] = useState({
    labels: [],
    users: [],
    earnings: [],
  });

  /* ---------------- Fetch Admin Progress ---------------- */
  const fetchAdminProgress = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/progress`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    setChartData(data);
  };

  /* ---------------- Fetch Calendar Events ---------------- */
  const fetchCalendarEvents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/session/admin`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const upcoming = (res.data?.Sessions || [])
        .filter((s) => s.status === "Upcoming")
        .map((s) => {
          const start = new Date(s.dateTime);
          const end = new Date(
            new Date(s.dateTime).getTime() + (s.duration || 60) * 60000
          );
          return {
            title: s.title,
            trainer: s.trainerId?.name || "Trainer",
            start,
            end,
            allDay: false,
          };
        });

      setEvents(upcoming);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- Fetch Admin Details ---------------- */
  const fetchDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setClients(data.Users);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/trainers`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      setTrainers(res.data.Trainers);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/recentUsers`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      setRecentUsers(response.data.RecentUsers);
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- Fetch Latest Reviews (NEW) ---------------- */
  const fetchLatestReviews = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/review/latest`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews(data.reviews);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchAdminProgress();
    fetchCalendarEvents();
    fetchLatestReviews(); // ✅ NEW
  }, []);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="bg-[#1e6b3e] dark:bg-[#17ab55] rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Notification />
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1">
            <span className="text-[#1e6b3e] capitalize font-medium">{user.name}</span>
            <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
              {user.profilePic ? (
                <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 font-bold">{user.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OVERVIEW SECTION */}
<div className="lg:col-span-2 bg-green-700 dark:bg-[#099a46] rounded-2xl p-4 sm:p-6 text-white">
  <h2 className="text-xl sm:text-2xl font-bold mb-6">OVERVIEW</h2>

  {/* Stats Cards */}
  <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      {/* Clients */}
      <div className="bg-[#e8f442] rounded-2xl p-4 sm:p-6 text-center">
        <h3 className="text-gray-700 font-semibold text-base sm:text-lg mb-2">
          CLIENTS
        </h3>
        <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
          {clients.length}
        </p>
      </div>

      {/* Trainers */}
      <div className="bg-gray-300 rounded-2xl p-4 sm:p-6 text-center flex flex-col justify-center">
        <h3 className="text-gray-700 font-semibold text-base sm:text-lg mb-2">
          TRAINERS
        </h3>
        <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
          {trainers.length}
        </p>
      </div>

    </div>
  </div>

  {/* Recent Members */}
  <div>
    <h3 className="text-lg sm:text-xl font-semibold mb-4">
      Recent Members
    </h3>

    <div className="flex flex-wrap gap-4 sm:gap-6">
      {recentUsers.map((u) => (
        <div key={u._id} className="flex flex-col items-center">
          <div className="bg-gray-300 rounded-full w-10 h-10 sm:w-12 sm:h-12 mb-1 flex items-center justify-center overflow-hidden">
            {u.profilePic ? (
              <img
                src={u.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-600 font-bold">
                {u.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <span className="text-xs sm:text-sm text-center">
            {u.name}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>


        {/* Calendar Section */}
        <div className="bg-[#e8e8dc] border-2 border-gray-400 rounded-2xl p-4 sm:p-6">
  <h2 className="text-xl sm:text-2xl font-bold mb-4">CALENDAR</h2>

  <div className="border-b border-gray-400 mb-3 pb-2 text-sm">
    Upcoming Sessions
  </div>

  <MiniCalendar events={events} showTrainer />
</div>


        {/* Chart Section - Takes 2 columns on large screens */}
        <div className="lg:col-span-2 bg-[#f5f5e8] border-2 border-gray-300 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-black mb-4">PROGRESS CHART</h2>

          <div className="w-full h-64 md:h-72 lg:h-80">
            <AdminProgressChart
              labels={chartData.labels}
              users={chartData.users}
              earnings={chartData.earnings}
            />
          </div>
        </div>


        {/* Reviews Section */}
        <div className="bg-[#528e7a]
 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">
            Latest Reviews / Feedbacks
          </h2>

          {reviews.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-white/70 text-sm">
              No reviews yet
            </div>
          ) : (
            <ul className="space-y-3">
              {reviews.map((r) => (
                <li
                  key={r._id}
                  className="bg-white/90 rounded-xl px-4 py-3 flex justify-between items-center text-gray-800"
                >
                  <span className="font-medium truncate">
                    {r.clientId?.name}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm
                      ${
                        r.rating >= 4
                          ? "bg-green-100 text-green-700"
                          : r.rating === 3
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {r.rating} <IoStar />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;