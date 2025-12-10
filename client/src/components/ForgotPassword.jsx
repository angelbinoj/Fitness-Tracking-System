import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Email is required");

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
        { email }
      );

      setMessage("A reset link has been sent to your email.");
      setColor("text-green-700");
      setLoading(false);

      // Optional: auto navigate after few seconds
      setTimeout(() => navigate("/login"), 3000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link");
      setColor("text-red-600");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-200 px-4">
      <div className="bg-slate-50 shadow-lg rounded-lg p-8 w-full max-w-md border border-green-200">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Forgot Password
        </h2>
        <p className="text-center text-green-700 mt-2 text-sm">
          Enter your registered email and we will send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="mb-4 p-3 border rounded-md border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-md text-white bg-green-600 hover:bg-green-700 transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className={`${color} mt-3 text-center font-medium`}>{message}</p>
        )}

        <p
          className="mt-5 text-center text-green-800 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
