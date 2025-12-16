import axios from 'axios';
import { useState } from "react";
import { MdHome } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import avatar from '../assets/avatar.png';

function SignUpPage() {
  const [userData, setUserData] = useState({name:"", email:"", contact:"", age:"", gender:"", profilePic:"", role:"client", password:"", confirmPassword:""});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleFileChange = (e) => {
    setUserData((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.contact || !userData.age || !userData.gender || !userData.role || !userData.password || !userData.confirmPassword) {
      setAlertMessage("All fields are required!");
      setAlertColor("text-red-600");
      setShowAlert(true);
      return;
    }

      // Email format check
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(userData.email)) {
    setAlertMessage("Invalid email format!");
    setAlertColor("text-red-600");
    setShowAlert(true);
    return;
  }

  // Phone number check
  if (!/^[0-9]{10}$/.test(userData.contact)) {
    setAlertMessage("Phone number must be 10 digits!");
    setAlertColor("text-red-600");
    setShowAlert(true);
    return;
  }

  // Password length check
  if (userData.password.length < 6) {
    setAlertMessage("Password must be at least 6 characters!");
    setAlertColor("text-red-600");
    setShowAlert(true);
    return;
  }

    if (userData.password !== userData.confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setAlertColor("text-red-600");
      setShowAlert(true);
      return;
    }

    try {
      const form = new FormData();
      form.append("name", userData.name);
      form.append("email", userData.email);
      form.append("contact", userData.contact);
      form.append("age", userData.age);
      form.append("gender", userData.gender);
      form.append("role", userData.role);
      form.append("password", userData.password);
      form.append("confirmPassword", userData.confirmPassword);
      if (userData.profilePic) form.append("profilePic", userData.profilePic);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        form,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(data);
      

      if (data?.message) {
      setAlertMessage(data.message);
      setAlertColor("text-green-700");
      setShowAlert(true);

      setTimeout(() => navigate("/login"), 1000);
    }
    } catch (error) {
      setAlertMessage(error?.response?.data?.error || "Registration failed");
      setAlertColor("text-red-600");
      setShowAlert(true);
    }
  }

  return (
    <div className="min-h-screen bg-green-100 dark:bg-slate-900 flex flex-col items-center pb-4 px-4">
      
      {/* Back to Home */}
      <div className="mt-4 w-full max-w-lg">
        <Link to='/'>
          <button className="uppercase bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 text-sm sm:text-base">
            <MdHome className="w-5 h-5 sm:w-6 sm:h-6" /> Back to Home
          </button>
        </Link>
      </div>

      {/* Signup Form */}
      <div className="flex flex-col mx-auto mt-8 items-center bg-white border border-green-400 rounded-lg shadow-md w-full max-w-xl p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-green-900 text-center mb-4">Let's Start Your Journey</h1>
        <p className="text-center text-green-800 mb-6 text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">Sign In</Link>
        </p>

        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {userData.profilePic ? (
              <img src={URL.createObjectURL(userData.profilePic)} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <img src={avatar} alt="avatar" className="w-full h-full object-contain" />
            )}
          </div>
        </div>

        <label className="block text-center mb-4 text-xs sm:text-sm font-medium cursor-pointer bg-green-600 hover:bg-green-700 px-3 sm:px-4 py-1 rounded-md text-white">
          Upload Profile Picture
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3 sm:gap-4">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
          
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="flex-1 p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
            <input type="text" name="contact" placeholder="Phone" onChange={handleChange} className="flex-1 p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input type="number" name="age" placeholder="Age" onChange={handleChange} className="flex-1 p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
            <select name="gender" onChange={handleChange} className="flex-1 p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex gap-4 items-center justify-center sm:justify-start">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="client" checked={userData.role === "client"} onChange={handleChange} className="accent-green-600 w-4 h-4" />
              <span className="text-green-900 text-sm sm:text-base">Client</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="trainer" checked={userData.role === "trainer"} onChange={handleChange} className="accent-green-600 w-4 h-4" />
              <span className="text-green-900 text-sm sm:text-base">Trainer</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="flex-1 p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="flex-1 p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>

          
        {showAlert && (
          <div className={`text-center font-semibold my-3 text-sm sm:text-base ${alertColor}`}>
            {alertMessage}
          </div>
        )}

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-md">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;