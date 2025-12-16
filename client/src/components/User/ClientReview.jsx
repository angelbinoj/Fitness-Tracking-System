import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientReview = ({ }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
   const user = JSON.parse(localStorage.getItem("user"));
   const trainerId =user.assignedTrainer;

  const handleSubmit = async () => {
    if (!rating || !comment) {
      setMessage("Please provide both rating and feedback.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/review/create`,
        { trainerId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Thank you for your feedback!");

      setTimeout(() => {
        navigate("/client/dashboard"); 
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Rate Your Trainer</h2>

        <label className="block font-semibold mb-1 text-green-900">Rating (1-5 stars)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4 outline-none"
        />

        <label className="block font-semibold mb-1 text-green-900">Comment / Feedback</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4 outline-none"
          rows={4}
          placeholder="Write your feedback..."
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"}`}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
        {message && (
          <p className="mt-3 text-center text-sm font-semibold text-green-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientReview;
