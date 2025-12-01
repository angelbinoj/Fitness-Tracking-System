import axios from "axios";
import { useEffect, useState } from "react";
import { GiHand } from "react-icons/gi";
import { Navigate, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token =localStorage.getItem("token");
  if (!user?.fitnessGoal) {
    return <Navigate to="/user/onboarding" />;
  }
  const navigate= useNavigate();
  const trainerAssigned = user.assignedTrainer;

  const [viewTrainerSelection, setViewTrainerSelection] = useState(!trainerAssigned);
  const [trainers,setTrainers] =useState([]);

  const bookTrainer =async(trainerId)=>{
    try {
      setViewTrainerSelection(false);
      const response = await axios.post("https://fitness-system-backend.vercel.app/api/booking",
        { trainerId },
        {    headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }  
      );
      console.log(response.data); 
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUser = {
      ...user,
      assignedTrainer: response.data.booking.trainerId, 
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    console.log("Trainer assigned:", updatedUser);
    navigate('/paymentPlans')

    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchTrainers= async()=>{
    try {
       const {data} = await axios.get("https://fitness-system-backend.vercel.app/api/user/trainers",
      {    headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }         
        );
        console.log(data.Trainers)
        setTrainers(data.Trainers);
  
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    if (!trainerAssigned) {
      fetchTrainers();
    }
  }, []); 

  return (
    <div className="h-full" >
      {viewTrainerSelection ? (
<div className="bg-gradient-to-br from-green-50 to-gray-100 p-6 h-full rounded-xl">
  <h2 className="text-3xl font-bold text-gray-900 flex gap-1">Welcome, {user.name} <GiHand className="text-[#f7ac5c] text-4xl"/></h2>

  <p className="mt-2 text-gray-700 text-lg leading-relaxed">
    You don't have a trainer assigned yet. Choosing a trainer will help you achieve your fitness goals with
    personalized workout sessions, nutrition guidance, and expert monitoring.
    <br />Explore our certified trainers below and book the one that fits your goals best!
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
        {/* Trainer Image */}
        <img
          src={trainer.profilePic || "https://via.placeholder.com/100"}
          alt="Trainer"
          className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-md"
        />

        {/* Trainer Info */}
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

        {/* Book Button */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all"
          onClick={()=>bookTrainer(trainer._id)}
        >
          Book Now
        </button>
      </div>
    ))}
  </div>
</div>
      ) : (
        /* Actual dashboard content */
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Your Dashboard</h3>
          <p>Your trainer is assigned! Here is your dashboard content...</p>

          {/* Example sections */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-200 rounded-lg">Workout Plan</div>
            <div className="p-4 bg-gray-200 rounded-lg">Nutrition Plan</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
