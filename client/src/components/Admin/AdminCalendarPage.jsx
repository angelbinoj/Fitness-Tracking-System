import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarComponent from "../CalendarComponent";

const AdminCalendarPage = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/session/admin`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const upcoming = (res.data?.Sessions || [])
          .filter(s => s.status === "Upcoming")
          .map(s => {
            const dateString = s.dateTime.substring(0, 19);
            const start = new Date(dateString);
            const end = new Date(start.getTime() + (s.duration || 60) * 60000);

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

    fetchSessions();
  }, []);

  return (
    <div className="w-full min-h-screen  flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-slate-50 shadow-xl rounded-2xl p-6 border border-green-200">
        <h1 className="text-3xl font-bold mb-6 text-green-700">
          All Upcoming Sessions
        </h1>

        <div className="bg-green-100 p-4 rounded-xl shadow-inner border border-green-200">
          <CalendarComponent events={events} />
        </div>
      </div>
    </div>
  );
};

export default AdminCalendarPage;
