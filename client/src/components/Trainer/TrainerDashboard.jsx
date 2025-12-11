import { useEffect, useState } from "react";
import Notification from "../Notification";

const TrainerDashboard = () => {
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setTrainer(storedUser);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  if (
    !user.trainerInfo ||
    !user.trainerInfo.specialization ||
    !user.trainerInfo.experience ||
    !user.trainerInfo.availability
  ) {
    window.location.href = "/trainer/onboarding";
    return null;
  }

  if (user.status == "pending") {
    window.location.href = "/trainer/pendingApproval";
    return null;
  }

  console.log(user.status);

  if (!trainer) return <p>Loading...</p>;

  const hasClients = trainer.assignedClients && trainer.assignedClients.length > 0;

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
      <div className="bg-[#1e6b3e] rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Notification />
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2">
            <span className="text-[#1e6b3e] font-medium capitalize">Hi, {trainer.name}</span>
            <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              {trainer.profilePic ? (
                <img src={trainer.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 font-bold">{trainer.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">
            Welcome Back, <span className="text-[#d8e700] capitalize">{trainer.name}</span>
          </h1>
          <p className="text-[#7fb069] text-lg font-medium mb-6">
            Let's help your clients stay on track today!"
          </p>

          {hasClients ? (
            <div>
              <section className="bg-[#28a745] p-6 rounded-2xl mb-6">
                <h2 className="text-white text-2xl font-bold mb-4">OVERVIEW</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#e8f442] text-center p-6 rounded-2xl">
                    <h3 className="font-bold text-sm text-[#28a745] mb-2">Total Clients</h3>
                    <p className="text-5xl font-bold text-[#4a4a4a]">{trainer.assignedClients.length}</p>
                  </div>

                  <div className="bg-[#e8f442] text-center p-6 rounded-2xl">
                    <h3 className="font-bold text-sm text-[#28a745] mb-2">Total Bookings</h3>
                    <p className="text-5xl font-bold text-[#4a4a4a]">11</p>
                  </div>

                  <div className="bg-[#e8f442] text-center p-6 rounded-2xl">
                    <h3 className="font-bold text-sm text-[#28a745] mb-2">Total Earnings</h3>
                    <p className="text-5xl font-bold text-[#4a4a4a]">54K</p>
                  </div>
                </div>
              </section>

              <section className="bg-[#f5f5e8] border-2 border-gray-300 p-6 rounded-2xl min-h-[400px]">
                <h2 className="font-bold text-2xl mb-4 text-black">Earning's Chart</h2>
                <div className="w-full h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <p className="text-lg">Chart will be implemented here</p>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="flex h-96 items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-bold">No clients assigned yet</h2>
                <p className="text-gray-600 mt-2">
                  Once clients are assigned to you, their details will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:w-80 bg-[#8fa894] rounded-2xl p-6">
          <h3 className="text-white text-xl font-bold mb-6 text-center">CALENDER</h3>
          <div className="mb-6">
            <div className="grid grid-cols-4 gap-3 mb-6">
              {/* <div className="bg-white rounded-full w-12 h-12 opacity-70"></div>
              <div className="bg-white rounded-full w-12 h-12 opacity-70"></div>
              <div className="bg-white rounded-full w-12 h-12 opacity-70"></div>
              <div className="bg-white rounded-full w-12 h-12 opacity-70"></div>
              <div className="bg-white rounded-full w-12 h-12 opacity-70"></div> */}
            </div>
          </div>
          
          <div className="border-t-2 border-white/30 pt-6">
            <h4 className="text-white text-lg font-bold mb-4">Training Schedule</h4>
            {/* <div className="space-y-3">
              <div className="bg-white/20 h-8 rounded"></div>
              <div className="bg-white/20 h-8 rounded"></div>
              <div className="bg-white/20 h-8 rounded"></div>
              <div className="bg-white/20 h-8 rounded"></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;