import axios from "axios";
import { useEffect, useState } from "react";
import { GiHand } from "react-icons/gi";
import { Navigate, useNavigate } from "react-router-dom";
import Notification from "../Notification";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  
  if (!user?.fitnessGoal) {
    return <Navigate to="/user/onboarding" />;
  }
  
  const navigate = useNavigate();
  const trainerAssigned = user.assignedTrainer;

  const [viewTrainerSelection, setViewTrainerSelection] = useState(!trainerAssigned);
  const [trainers, setTrainers] = useState([]);

  const bookTrainer = async (trainerId) => {
    try {
      setViewTrainerSelection(false);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/booking`,
        { trainerId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = {
        ...user,
        assignedTrainer: response.data.booking.trainerId,
      };

      navigate("/paymentPlans");
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("Trainer assigned:", updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/trainers`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const filtered = data.Trainers.filter(
        (t) => t.status === "approved" || !t.status
      );

      setTrainers(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!trainerAssigned) {
      fetchTrainers();
    }
  }, []);

  return (
    <div className="h-full">
      {viewTrainerSelection ? (
        <div className="bg-gradient-to-br from-green-50 to-gray-100 p-6 h-full rounded-xl">
          <h2 className="text-3xl font-bold text-gray-900 flex gap-1">
            Welcome, {user.name} <GiHand className="text-[#f7ac5c] text-4xl" />
          </h2>

          <p className="mt-2 text-gray-700 text-lg leading-relaxed">
            You don't have a trainer assigned yet. Choosing a trainer will help you achieve your fitness goals with
            personalized workout sessions, nutrition guidance, and expert monitoring.
            <br />
            Explore our certified trainers below and book the one that fits your goals best!
          </p>

          <h3 className="text-2xl font-semibold mt-6 text-green-800 border-l-4 border-green-600 pl-3">
            Available Trainers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {trainers.map((trainer) => (
              <div
                key={trainer._id}
                className="bg-white shadow-xl p-5 rounded-xl border border-gray-300 flex gap-5 items-center hover:shadow-2xl hover:scale-[1.01] transition-all bg-gradient-to-r from-white to-green-50"
              >
                <img
                  src={trainer.profilePic || "https://via.placeholder.com/100"}
                  alt="Trainer"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-md"
                />

                <div className="flex flex-col flex-1">
                  <h4 className="text-xl font-bold capitalize text-gray-900">{trainer.name}</h4>
                  <p className="text-gray-700 text-sm capitalize">
                    Specialization: <span className="font-medium">{trainer.specialization}</span>
                  </p>
                  <p className="text-gray-700 text-sm">
                    Experience: <span className="font-medium">{trainer.experience} yrs</span>
                  </p>
                  <p className="text-gray-700 text-sm">
                    Availability: <span className="font-medium">{trainer.availability}</span>
                  </p>
                </div>

                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all"
                  onClick={() => bookTrainer(trainer._id)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Dashboard Content */
        <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="bg-[#1e6b3e] rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
              <Notification />
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
                <span className="text-[#1e6b3e] font-medium">{user.name}</span>
                <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-600 font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Motivation Card */}
            <div className="bg-[#e8f442] rounded-2xl p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Profile Section */}
                <div className="bg-[#2d7a45] rounded-2xl p-6 w-full lg:w-64 flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gray-300 rounded-full w-24 h-24 mb-4 flex items-center justify-center overflow-hidden">
                      {user.profilePic ? (
                        <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-600 font-bold text-4xl">{user.name?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <h3 className="text-white capitalize font-bold text-lg mb-1">{user.name}</h3>
                    <p className="text-white capitalize mb-4">Fitness Goal :{user.fitnessGoal || "Goal"}</p>
                    <button 
                      onClick={() => navigate('/user/updateProfile')}
                      className="bg-gray-200 hover:bg-white transition rounded-full px-6 py-2 font-medium text-[#2d7a45] w-full"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 w-full">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black">
                      Keep going, <span className="text-[#1e3a8a]">{user.name}!</span>
                    </h2>
                    <p className="text-lg font-semibold text-black">
                      Every step brings you closer to your goal
                    </p>
                    <p className="text-base text-black mt-1">
                      Stay consistent and watch your progress grow!
                    </p>
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => navigate('/user/workoutPlan')}
                      className="bg-[#4a4a4a] hover:bg-[#3a3a3a] transition rounded-2xl p-8 text-white text-center shadow-lg"
                    >
                      <h3 className="text-xl font-bold">Workout plan</h3>
                    </button>
                    <button 
                      onClick={() => navigate('/user/nutritionPlan')}
                      className="bg-[#4a4a4a] hover:bg-[#3a3a3a] transition rounded-2xl p-8 text-white text-center shadow-lg"
                    >
                      <h3 className="text-xl font-bold">Nutrition plan</h3>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Chart */}
              <div className="lg:col-span-2 bg-[#4a4a4a] rounded-2xl p-6 min-h-[300px]">
                <h3 className="text-white text-2xl font-bold mb-4">Progress Chart</h3>
                <div className="flex items-center justify-center h-64 text-gray-300">
                  {/* Placeholder for chart */}
                  <div className="text-center">
                    <p className="text-lg">Chart will be implemented here</p>
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-[#e8e8dc] border-2 border-gray-400 rounded-2xl p-6">
                <h3 className="text-gray-700 text-xl font-bold mb-4 text-center">CALENDER</h3>
                <p className="text-gray-600 text-sm mb-4 uppercase">Sessions</p>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;