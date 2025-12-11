import axios from 'axios';
import { useState } from "react";
import { MdHome } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      setAlertMessage("All fields are required!");
      setAlertColor("text-red-600");
      setShowAlert(true);
      return;
    }

    try {
      const { data } = await axios.post(
        "https://fitness-system-backend.vercel.app/api/auth/login",
        userData,
        { withCredentials: true }
      );

      if (data?.message) {
        localStorage.setItem('token', data.token);
        localStorage.setItem("role", data.User.role);
        localStorage.setItem("user", JSON.stringify(data.User));
        setAlertMessage(data.message);
        setAlertColor("text-green-700");
        setShowAlert(true);

        setTimeout(() => {
          if (data.User.role === "client") navigate("/client/dashboard");
          if (data.User.role === "trainer") navigate("/trainer/dashboard");
          if (data.User.role === "admin") navigate("/admin/dashboard");
        }, 1000);
      }
    } catch (error) {
      setAlertMessage(error?.response?.data?.error);
      setAlertColor("text-red-600");
      setShowAlert(true);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center px-4">
      {/* Back Home Button */}
      <div className="mt-8 w-full max-w-md">
        <Link to='/'>
          <button className="uppercase bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full px-6 py-2 flex items-center gap-2">
            <MdHome className="w-6 h-6" /> Back to Home
          </button>
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex flex-col mx-auto mt-10 items-center bg-white border border-green-400 rounded-lg shadow-md w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-green-900 text-center mb-4">Sign in to ElevFit</h1>
        <p className="text-center text-green-800 mb-6">
          New User?{" "}
          <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold">
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {showAlert && (
            <div className={`text-center font-semibold ${alertColor}`}>
              {alertMessage}
            </div>
          )}

          <div
            onClick={() => navigate("/forgotPassword")}
            className="text-right text-green-900 hover:text-green-700 hover:underline cursor-pointer text-sm"
          >
            Forgot Password?
          </div>

          <div className="flex gap-4 justify-between mt-4">
            <button
              type="reset"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-md"
            >
              Reset
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
