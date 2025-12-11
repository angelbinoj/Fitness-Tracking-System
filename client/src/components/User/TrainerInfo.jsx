import axios from "axios";
import { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";

function TrainerInfo() {
  const token = localStorage.getItem("token");

  const [trainer, setTrainer] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const trainerId = user.assignedTrainer;

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://fitness-system-backend.vercel.app/api/user/trainer/${trainerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setTrainer(data.profile);
        if (data.profile.profilePic) setPreview(data.profile.profilePic);
      } catch (err) {
        console.log(err);
        setError("Failed to load trainer details....");
      }
    };

    fetchTrainerDetails();
  }, [trainerId, token]);

  if (!trainer) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg sm:text-xl font-semibold px-4 text-center">
        {error || "Loading trainer information..."}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start bg-green-50 min-h-screen py-6 px-4 sm:px-6 md:px-10">
      <div className="flex flex-col items-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-[#e7ebd3] shadow-lg border border-[#a3b30f] rounded-2xl pb-10">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl mt-8 font-bold text-slate-900 uppercase text-center">
          Trainer Information
        </h1>

        {/* Trainer Avatar */}
        <div className="flex flex-col items-center mt-5">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-300 border-2 border-slate-100 rounded-full overflow-hidden">
            <img
              src={preview || avatar}
              alt="trainer"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl mt-3 font-bold uppercase text-green-900 text-center">
            {trainer.name}
          </h2>
        </div>

        {/* Trainer Info Cards */}
        <div className="flex flex-col gap-4 sm:gap-5 w-full sm:w-10/12 mt-8 text-sm sm:text-base md:text-lg">
          {[
            { label: "Email", value: trainer.email },
            { label: "Contact", value: trainer.contact },
            { label: "Specialization", value: trainer.trainerInfo.specialization },
            { label: "Experience", value: trainer.trainerInfo.experience },
            { label: "Availability", value: trainer.trainerInfo.availability },
          ].map((info, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between bg-white px-4 py-3 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <span className="font-semibold text-green-800">{info.label}</span>
              <span className="mt-1 sm:mt-0">{info.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrainerInfo;
