
import axios from "axios";
import { useEffect, useState } from "react";

function TrainerList() {
  const [trainers, setTrainers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTrainers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/trainers`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      const sorted = [...data.Trainers].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setTrainers(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/trainer/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      fetchTrainers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div className=" min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-800 dark:text-green-500 mb-6 border-l-4 border-green-600 pl-3">
        Trainer List
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trainers.map((trainer) => (
          <div
  key={trainer._id}
  className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row gap-6 hover:shadow-2xl transition"
>
           {/* Profile Image */}
  <div className="flex-shrink-0 flex items-center justify-center">
    <img
      src={trainer.profilePic || "https://via.placeholder.com/100"}
      alt={trainer.name}
      className="w-28 h-28 rounded-full object-cover border-4 border-green-500 shadow-md"
    />
  </div>

           {/* Info Section */}
  <div className="flex-1 flex flex-col justify-between">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* Left Column */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-gray-900 capitalize">{trainer.name}</h2>
        <p className="text-gray-700 text-sm">Email: <span className="font-medium">{trainer.email}</span></p>
        <p className="text-gray-700 text-sm">Contact: <span className="font-medium">{trainer.contact}</span></p>
        <p className="text-gray-700 text-sm">Age: <span className="font-medium">{trainer.age}</span></p>
        <p className="text-gray-700 text-sm">Gender: <span className="font-medium capitalize">{trainer.gender}</span></p>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-1">
        <h3 className="text-green-800 font-semibold">Trainer Details</h3>
        <p className="text-gray-700 text-sm">Specialization: <span className="font-medium">{trainer.trainerInfo?.specialization || "N/A"}</span></p>
        <p className="text-gray-700 text-sm">Experience: <span className="font-medium">{trainer.trainerInfo?.experience || 0} yrs</span></p>
        <p className="text-gray-700 text-sm">Availability: <span className="font-medium">{trainer.trainerInfo?.availability || "N/A"}</span></p>

        {/* Certifications */}
        {trainer.trainerInfo?.certifications?.length > 0 && (
          <div className="mt-2">
            <h4 className="text-green-800 font-semibold mb-1">Certifications:</h4>
            <div className="flex flex-wrap gap-2">
              {trainer.trainerInfo.certifications.map((cert, index) => (
                <a
                  key={index}
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  {cert.description || `Certification ${index + 1}`}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

               {/* Approve Button */}
    <div className="mt-4">
      {trainer.status !== "approved" ? (
        <button
          onClick={() => handleApprove(trainer._id)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Approve Trainer
        </button>
      ) : (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded font-semibold">
          Approved
        </span>
      )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainerList;
