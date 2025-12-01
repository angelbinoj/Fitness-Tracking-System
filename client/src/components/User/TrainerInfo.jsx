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
          `http://localhost:4000/api/user/trainer/${trainerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        console.log(data.profile);            
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
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        {error || "Loading trainer information..."}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col mx-auto mb-5 items-center bg-[#e7ebd3] shadow-lg border border-[#a3b30f] rounded-md font-medium w-3/5 pb-10">
        
        <h1 className="text-3xl mt-8 font-bold text-slate-900 uppercase">
          Trainer Information
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-32 h-32 bg-gray-300 border-slate-100 border-2 rounded-full overflow-hidden">
            {preview ? (
              <img src={preview} alt="trainer" className="w-full h-full object-cover" />
            ) : (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            )}
          </div>

          <h2 className="text-2xl mt-3 font-bold uppercase">{trainer.name}</h2>
        </div>

        <div className="flex flex-col gap-5 w-10/12 mt-8 text-lg">

          <div className="flex justify-between bg-white px-4 py-3 rounded-md shadow">
            <span className="font-semibold">Email</span>
            <span>{trainer.email}</span>
          </div>

          <div className="flex justify-between bg-white px-4 py-3 rounded-md shadow">
            <span className="font-semibold">Contact</span>
            <span>{trainer.contact}</span>
          </div>

          <div className="flex justify-between bg-white px-4 py-3 rounded-md shadow">
            <span className="font-semibold">Specialization</span>
            <span>{trainer.trainerInfo.specialization}</span>
          </div>

          <div className="flex justify-between bg-white px-4 py-3 rounded-md shadow">
            <span className="font-semibold">Experience</span>
            <span>{trainer.trainerInfo.experience}</span>
          </div>

          <div className="flex justify-between bg-white px-4 py-3 rounded-md shadow">
            <span className="font-semibold">Availability</span>
            <span>{trainer.trainerInfo.availability}</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TrainerInfo;
