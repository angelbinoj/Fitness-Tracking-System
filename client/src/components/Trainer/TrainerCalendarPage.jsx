import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarComponent from "../CalendarComponent";

const TrainerCalendarPage = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/session/trainer`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const sessions = res.data.Sessions || [];

        const upcoming = sessions
          .filter((s) => s.status === "Upcoming")
          .map((s) => {
            const dateString = s.dateTime.substring(0, 19);
            const start = new Date(dateString);
            const end = new Date(start.getTime() + (s.duration || 60) * 60000);

            return {
              title: s.title,
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
      <div className="w-full max-w-5xl bg-slate-50 shadow-lg rounded-2xl p-6 border border-green-200">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-4 text-green-800">
          Trainer Calendar
        </h1>

        {/* Description */}
        <p className="text-gray-700 mb-6">
          View all your upcoming training sessions in the calendar below.
        </p>

        {/* Calendar Container */}
        <div className="bg-green-100 p-4 rounded-xl border border-green-300 shadow-inner">
          <CalendarComponent events={events} />
        </div>

      </div>
    </div>
  );
};

export default TrainerCalendarPage;
