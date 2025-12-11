import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";

const TrainerSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", time: "", duration: 60 });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchSessions = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/session/trainer`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(data.Sessions || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!form.date || !form.time) {
        alert("Please select both date and time.");
        return;
      }

      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/session/trainer/${editingId}`,
          { title: form.title, duration: form.duration, date: form.date, time: form.time },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Session updated successfully!");
        setEditingId(null);
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/session/trainer/create`,
          { title: form.title, duration: form.duration, date: form.date, time: form.time },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Session created successfully!");
      }

      setForm({ title: "", date: "", time: "", duration: 60 });
      fetchSessions();
    } catch (err) {
      alert(err.response?.data?.error || "Operation failed");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this session?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/session/trainer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Session cancelled successfully!");
      fetchSessions();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to cancel session");
    }
  };

  const handleEdit = (session) => {
    setEditingId(session._id);
    const dt = new Date(session.dateTime);
    setForm({
      title: session.title,
      date: dt.toISOString().split("T")[0],
      time: dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      duration: session.duration,
    });
  };

  const markCompleted = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/session/trainer/${id}`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Status updated successfully!");
      fetchSessions();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update status");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen">

      {message && (
        <div className="bg-green-200 border border-green-400 text-green-800 px-5 py-3 rounded-lg mb-4 text-center font-medium shadow">
          {message}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-green-800 text-center tracking-wide">
        Manage Sessions
      </h1>

      <div className="bg-white border border-green-300 rounded-xl shadow-md p-6 max-w-4xl mx-auto mb-10">
        <h2 className="font-semibold text-xl mb-4 text-green-700">
          {editingId ? "Edit Session" : "Create New Session"}
        </h2>

        <div className="flex flex-wrap gap-4">

          <input
            type="text"
            placeholder="Session Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border border-green-400 rounded-lg px-3 py-2 w-full md:w-52"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border border-green-400 rounded-lg px-3 py-2 w-full md:w-44"
          />

          <TimePicker
            onChange={(value) => setForm({ ...form, time: value })}
            value={form.time}
            disableClock={true}
            clearIcon={null}
            format="HH:mm"
            className="w-full md:w-40 bg-white border border-green-400 rounded-lg"
          />

          <input
            type="number"
            placeholder="Duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="border border-green-400 rounded-lg px-3 py-2 w-28"
          />

          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-lg font-semibold text-white w-full md:w-auto shadow-md transition
              ${editingId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}
            `}
          >
            {editingId ? "Update" : "Create"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", date: "", time: "", duration: 60 });
              }}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg w-full md:w-auto shadow-md"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center mb-10">
        <button
          onClick={() => navigate("/trainer/sessionCalender")}
          className="bg-green-700 hover:bg-green-800 px-6 py-2 rounded-lg text-white shadow-md"
        >
          View Session Calendar
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center p-10 bg-white border border-green-200 rounded-xl shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-green-800">No Sessions Created Yet</h2>
          <p className="text-gray-600 mt-2">Start creating sessions for your clients.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border border-green-300 rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-green-800">Your Sessions</h2>
          <table className="w-full border-collapse">
            <thead className="bg-green-200 text-green-900">
              <tr>
                <th className="border px-3 py-2">Title</th>
                <th className="border px-3 py-2">Date & Time</th>
                <th className="border px-3 py-2">Duration</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((s) => (
                <tr key={s._id} className="text-center hover:bg-green-50 transition">
                  <td className="border px-3 py-2">{s.title}</td>
                  <td className="border px-3 py-2">
                    {(() => {
                      const dt = new Date(s.dateTime);
                      const date = dt.toISOString().split("T")[0];
                      const time = dt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      });
                      return `${date} ${time}`;
                    })()}
                  </td>
                  <td className="border px-3 py-2">{s.duration} min</td>
                  <td className="border px-3 py-2 capitalize">{s.status}</td>

                  <td className="border px-3 py-2 flex justify-center gap-3 flex-wrap">

                    <button
                      disabled={s.status === "Completed"}
                      onClick={() => handleEdit(s)}
                      className={`px-4 py-1 rounded-lg shadow ${
                        s.status === "Completed"
                          ? "bg-gray-300 text-gray-600"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Edit
                    </button>

                    <button
                      disabled={s.status === "Completed"}
                      onClick={() => handleCancel(s._id)}
                      className={`px-4 py-1 rounded-lg shadow ${
                        s.status === "Completed"
                          ? "bg-gray-300 text-gray-600"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      Cancel
                    </button>

                    {s.status === "Upcoming" && (
                      <button
                        onClick={() => markCompleted(s._id)}
                        className="bg-green-700 hover:bg-green-800 text-white px-4 py-1 rounded-lg shadow"
                      >
                        Mark Completed
                      </button>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default TrainerSessions;
