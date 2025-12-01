import axios from "axios";
import { useEffect, useState } from "react";


function TrainerList(){

  const [trainers,setTrainers] =useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTrainers= async()=>{
    try {
       const {data} = await axios.get("https://fitness-system-backend.vercel.app/admin/trainers",
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
      fetchTrainers();
  }, []);


    return(
        <div className="bg-gradient-to-br from-green-50 to-gray-100 p-6 h-full rounded-xl">
        
          <h3 className="text-4xl font-semibold mt-6 capitalize text-green-800 border-l-4 border-green-600 pl-3">
             Below is the list of trainers
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
              </div>
            ))}
          </div>
        </div>
    )
}

export default TrainerList;