import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const dateTime = new Date(`${form.date}T${form.time}`);
      const dateTimeUTC = new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000);

      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/session/trainer/${editingId}`, {
          title: form.title,
          duration: form.duration,
          dateTime: dateTimeUTC,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
        setMessage("Session updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/session/trainer/create`, {
          title: form.title,
          duration: form.duration,
          dateTime: dateTimeUTC,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    const date = new Date(session.dateTime).toISOString().split("T")[0];
    const time = new Date(session.dateTime).toISOString().split("T")[1].slice(0, 5);

    setForm({
      title: session.title,
      date,
      time,
      duration: session.duration,
    });
  };

  const markCompleted = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/session/trainer/${id}`, { status: "Completed" }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Status updated successfully!");
      fetchSessions();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update status");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="p-6 bg-green-100 h-full">
      {message && (
        <div className="bg-green-200 border border-green-400 text-green-700 px-4 py-2 rounded mb-3">
          {message}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Manage Sessions</h1>

      <div className="mb-6 border p-4 rounded-lg shadow-sm bg-green-200 border-green-400">
        <h2 className="font-semibold text-lg mb-3">
          {editingId ? "Edit Session" : "Create New Session"}
        </h2>

        <div className="flex flex-wrap gap-3 mb-3">
          <input type="text" placeholder="Title" name="title" value={form.title} onChange={handleChange}
            className="border rounded px-3 py-2 w-48" />

          <input type="date" name="date" value={form.date} onChange={handleChange}
            className="border rounded px-3 py-2 w-40" />

          <input type="time" name="time" value={form.time} onChange={handleChange}
            className="border rounded px-3 py-2 w-36" />

          <input type="number" name="duration" value={form.duration} onChange={handleChange}
            className="border rounded px-3 py-2 w-28" />

          <button onClick={handleSubmit}
            className={`px-5 py-2 rounded font-medium text-white ${
              editingId ? "bg-blue-600 hover:bg-blue-500" : "bg-green-600 hover:bg-green-500"
            }`}>
            {editingId ? "Update" : "Create"}
          </button>

          {editingId && (
            <button onClick={() => { setEditingId(null); setForm({ title: "", date: "", time: "", duration: 60 }); }}
              className="px-5 py-2 rounded font-medium ml-3 bg-gray-500 hover:bg-gray-600 text-white">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <button onClick={()=>navigate("/trainer/sessionCalender")} className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-500">View Session Calendar</button>
      </div>

      <h2 className="font-semibold text-xl mb-3">Your Sessions</h2>

      {sessions.length === 0 ? (
        <div className="flex justify-center items-center ">
  <div className=" w-2/4 p-10 rounded-xl flex flex-col text-center">
    <h2 className="text-2xl font-bold text-green-900">No Sessions Created Yet!</h2>
    <p className="mt-2 text-gray-700 text-lg">
      You haven’t created any sessions yet. Start adding sessions so your clients can book and attend them.
    </p>
  </div>
</div>

      ) : (
        <table className="border-collapse w-full shadow-sm">
          <thead>
            <tr className="bg-gray-400">
              <th className="border border-slate-700 px-3 py-2">Title</th>
              <th className="border border-slate-700 px-3 py-2">Date & Time</th>
              <th className="border border-slate-700 px-3 py-2">Duration</th>
              <th className="border border-slate-700 px-3 py-2">Status</th>
              <th className="border border-slate-700 px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((s) => (
              <tr key={s._id}>
                <td className="border border-slate-700 px-3 py-2">{s.title}</td>

                <td className="border border-slate-700 px-3 py-2">
                  {(() => {
                    const dt = new Date(s.dateTime);
                    const date = dt.toISOString().split("T")[0];
                    const time = dt.toISOString().split("T")[1].slice(0, 5);
                    return `${date} ${time}`;
                  })()}
                </td>

                <td className="border border-slate-700 px-3 py-2">{s.duration} min</td>
                <td className="border border-slate-700 px-3 py-2 capitalize">{s.status}</td>

                <td className="border border-slate-700 p-2 flex justify-center items-center gap-4">
                  <button disabled={s?.status === "Completed"} onClick={() => handleEdit(s)}
                    className={`px-6 py-1 rounded ${s?.status === "Completed" ? "bg-gray-400 text-gray-700" : "bg-blue-600 text-white hover:bg-blue-500"}`}>
                    Edit
                  </button>

                  <button disabled={s?.status === "Completed"} onClick={() => handleCancel(s._id)}
                    className={`px-6 py-1 rounded ${s?.status === "Completed" ? "bg-gray-400 text-gray-700" : "bg-red-600 text-white hover:bg-red-500"}`}>
                    Cancel Session
                  </button>

                  {s.status === "Upcoming" && (
                    <button onClick={() => markCompleted(s._id)}
                      className="bg-green-700 text-white px-3 py-1 rounded">
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default TrainerSessions;
