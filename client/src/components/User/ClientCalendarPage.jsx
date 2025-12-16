import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarComponent from "../CalendarComponent"; // Adjust path if needed

const ClientCalendarPage = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/session/user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );


        const upcoming = res.data.Sessions
          .filter((s) => s.status === "Upcoming" && s.bookedUsers?.includes(user._id))
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

        console.log("Upcoming events start dates:",upcoming);
        upcoming.forEach((event) =>
          console.log(event.title, event.start)
        );

        setEvents(upcoming);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10 px-4">
      <div className="w-full md:w-4/5 lg:w-3/5 bg-slate-50 shadow-xl rounded-xl p-6 border border-green-200">

        <h1 className="text-3xl font-bold mb-6 text-green-800 text-center md:text-left">
          Your Sessions
        </h1>

        <div className="rounded-xl overflow-hidden shadow-lg border border-green-300">
          <CalendarComponent events={events} />
        </div>

      </div>
    </div>
  );
};

export default ClientCalendarPage;
