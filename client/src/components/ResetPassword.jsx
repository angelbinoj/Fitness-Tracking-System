import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATIONS
    if (!newPassword || !confirm) {
      setMessage("All fields are required");
      setColor("text-red-600");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters!");
      setColor("text-red-600");
      return;
    }

    if (newPassword !== confirm) {
      setMessage("Passwords do not match!");
      setColor("text-red-600");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/resetPassword/${token}`,
        { newPassword }
      );

      setMessage(data.message);
      setColor("text-green-700");
      setLoading(false);

      setTimeout(() => navigate("/login"), 2500);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
      setColor("text-red-600");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-green-50 shadow-lg rounded-lg p-8 w-full max-w-md border border-green-200">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Reset Password
        </h2>
        <p className="text-center text-green-700 mt-2 text-sm">
          Create a new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col mt-6">

          <input
            type="password"
            placeholder="New Password"
            className="mb-4 p-3 border rounded-md border-green-300 focus:ring-2 focus:ring-green-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="mb-4 p-3 border rounded-md border-green-300 focus:ring-2 focus:ring-green-400"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-md text-white bg-green-600 hover:bg-green-700 transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Updating..." : "Reset Password"}
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

export default ResetPassword;
