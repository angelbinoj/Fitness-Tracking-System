import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookSession = () => {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/session/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(data.Sessions || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBook = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/session/user/book`,
        { sessionId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Session booked successfully!");
      fetchSessions();
    } catch (err) {
      setMessage(err.response?.data?.error || "Booking failed");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen w-full bg-green-50 p-4 sm:p-6 md:p-8">
      {sessions.length === 0 ? (
        <div className="bg-green-100 p-6 h-full flex justify-center items-center rounded-xl shadow-md">
          <div className="w-full sm:w-3/4 md:w-2/3 p-6 sm:p-10 rounded-xl flex flex-col bg-white border border-green-200 shadow-xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800">No Upcoming Sessions!</h2>
            <p className="mt-3 text-gray-700 text-base sm:text-lg">
              There are no upcoming sessions available to book at the moment. Check back later or contact your trainer for updates.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-4/5 lg:w-3/5 mx-auto mt-6 flex flex-col gap-4">
          {message && (
            <div className="bg-green-200 text-green-800 px-4 py-2 rounded text-center font-medium shadow">
              {message}
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-800 text-center md:text-left">
              Available Sessions
            </h1>
            <button
              onClick={() => navigate("/user/sessionCalender")}
              className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 shadow-md transition"
            >
              View Session Calendar
            </button>
          </div>

          <div className="overflow-x-auto shadow-lg">
            <table className="min-w-full bg-white border-collapse text-center">
              <thead className="bg-green-300 text-green-900">
                <tr>
                  <th className="border border-green-600 px-3 py-2">Title</th>
                  <th className="border border-green-600 px-3 py-2">Date & Time</th>
                  <th className="border border-green-600 px-3 py-2">Duration</th>
                  <th className="border border-green-600 px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => {
                  const dt = new Date(s.dateTime);
                  const date = dt.toISOString().split("T")[0];
                  const time = dt.toISOString().split("T")[1].slice(0, 5);

                  const isBooked = s.bookedUsers?.includes(user._id);

                  return (
                    <tr key={s._id} className="hover:bg-green-50 transition">
                      <td className="border border-green-600 px-3 py-2">{s.title}</td>
                      <td className="border border-green-600 px-3 py-2">{`${date} - ${time}`}</td>
                      <td className="border border-green-600 px-3 py-2">{s.duration} min</td>
                      <td className="border border-green-600 px-3 py-2">
                        <button
                          onClick={() => handleBook(s._id)}
                          disabled={isBooked}
                          className={`px-4 py-2 rounded font-medium shadow-md transition text-sm sm:text-base ${
                            isBooked
                              ? "text-green-700 bg-green-100 cursor-not-allowed border border-green-400"
                              : "text-white bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {isBooked ? "Booked!" : "Book Now"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSession;
