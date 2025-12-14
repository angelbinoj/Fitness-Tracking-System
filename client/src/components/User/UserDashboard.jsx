import axios from "axios";
import { useEffect, useState } from "react";
import { FaDumbbell, FaAppleAlt } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import Notification from "../Notification";
import ClientProgressChart from "./ClientProgressChart";
import MiniCalendar from "../MiniCalendar";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [progress, setProgress] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchClientSessions = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/session/user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const upcoming = res.data.Sessions
        .filter(s => s.status === "Upcoming")
        .map(s => {
          const start = new Date(s.dateTime);
          const end = new Date(
            start.getTime() + (s.duration || 60) * 60000
          );

          return { title: s.title, start, end };
        });

      setEvents(upcoming);
    };

    fetchClientSessions();
  }, []);

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

      const updatedUser = {
        ...user,
        assignedTrainer: response.data.booking.trainerId,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/paymentPlans");
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
    if (!trainerAssigned) fetchTrainers();
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/progress`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setProgress(res.data);
      } catch (error) {
        console.log("Progress error:", error);
      }
    };

    if (trainerAssigned) fetchProgress();
  }, [trainerAssigned]);

  return (
    <div className="h-full">
      {viewTrainerSelection ? (
        <div className="bg-gradient-to-br from-green-50 to-gray-100 p-6 h-full rounded-xl">
          <h2 className="text-3xl font-bold text-gray-900 flex gap-1">
            Welcome, {user.name} <GiHand className="text-[#f7ac5c] text-4xl" />
          </h2>
          <p className="mt-2 text-gray-700 text-lg leading-relaxed">
            You don't have a trainer assigned yet. Choosing a trainer will help you achieve your fitness goals with personalized workout sessions, nutrition guidance, and expert monitoring.
            <br /> Explore our certified trainers below and book the one that fits your goals best!
          </p>
          <h3 className="text-2xl font-semibold mt-6 text-green-800 border-l-4 border-green-600 pl-3"> Available Trainers </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {trainers.map((trainer) => (
              <div key={trainer._id}
                className="bg-white shadow-xl p-5 rounded-xl border border-gray-300 flex gap-5 items-center hover:shadow-2xl hover:scale-[1.01] transition-all bg-gradient-to-r from-white to-green-50" >
                <img src={trainer.profilePic || "https://via.placeholder.com/100"} alt="Trainer"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-md" />
                <div className="flex flex-col flex-1">
                  <h4 className="text-xl font-bold capitalize text-gray-900">{trainer.name}</h4>
                  <p className="text-gray-700 text-sm capitalize"> Specialization: <span className="font-medium">{trainer.specialization}</span> </p>
                  <p className="text-gray-700 text-sm"> Experience: <span className="font-medium">{trainer.experience} yrs</span> </p>
                  <p className="text-gray-700 text-sm"> Availability: <span className="font-medium">{trainer.availability}</span> </p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all"
                  onClick={() => bookTrainer(trainer._id)} > Book Now </button> </div>))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
          <div className="bg-[#1e6b3e] rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
              <Notification />
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
                <span className="text-[#1e6b3e] font-medium capitalize">{user.name}</span>
                <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-600 font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#e8f442] rounded-2xl p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="bg-[#2d7a45] rounded-2xl p-6 w-full lg:w-64">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gray-300 rounded-full w-24 h-24 mb-4 overflow-hidden">
                      {user.profilePic ? (
                        <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-600 font-bold text-4xl">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold capitalize">{user.name}</h3>
                    <p className="text-white mb-4">Fitness Goal: {user.fitnessGoal}</p>
                    <button
                      onClick={() => navigate("/user/updateProfile")}
                      className="bg-gray-200 rounded-full px-6 py-2 font-medium text-[#2d7a45]"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">
                    Keep going, <span className="text-[#1e3a8a] capitalize">{user.name}!</span>
                  </h2>
                  <p className="font-semibold mb-4">
                    Every step brings you closer to your goal
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <button
                      onClick={() => navigate("/user/workoutPlan")}
                      className="bg-gradient-to-br from-green-700 to-emerald-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-left"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/20 p-3 rounded-xl text-2xl">
                          <FaDumbbell className="text-2xl text-[#ffe600dd]" />
                        </div>
                        <h3 className="text-2xl font-bold">Workout Plan</h3>
                      </div>
                      <p className="text-sm text-white/90">
                        Personalized workouts tailored to your fitness goal.
                      </p>
                      <span className="inline-block mt-4 font-semibold underline">
                        View Plan
                      </span>
                    </button>


                    <button
                      onClick={() => navigate("/user/nutritionPlan")}
                      className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl p-6 text-black shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-left"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-black/10 p-3 rounded-xl text-2xl">
                          <FaAppleAlt className="text-2xl" />
                        </div>
                        <h3 className="text-2xl font-bold">Nutrition Plan</h3>
                      </div>
                      <p className="text-sm text-black/80">
                        Balanced meals designed to support your training.
                      </p>
                      <span className="inline-block mt-4 font-semibold underline">
                        View Plan
                      </span>
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#eaeadd] border-2 border-gray-300 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-black">Progress Chart</h3>

                <div className="bg-white rounded-xl p-4 h-72 shadow-inner border">
                  {progress ? (
                    <ClientProgressChart
                      labels={progress.labels}
                      actual={progress.actual}
                      target={progress.target}
                    />
                  ) : (
                    <p className="text-center text-gray-600">Loading progress...</p>
                  )}
                </div>
              </div>


              <section className="bg-[#eaeadd] border-2 border-gray-300 rounded-2xl p-4">
                <h3 className="font-bold text-lg text-center mb-3 text-black">
                  My Schedule
                </h3>

                <div className="bg-white rounded-xl p-2 shadow-inner border">
                  <MiniCalendar events={events} />
                </div>
              </section>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
