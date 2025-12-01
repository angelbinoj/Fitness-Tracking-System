import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

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
    return <Navigate to="/trainer/onboarding" />;
  }


  if (!trainer) return <p>Loading...</p>; 

  const hasClients = trainer.assignedClients && trainer.assignedClients.length > 0;

  return (
    <div>
      {/* Main Content */}
      <main className="flex-1 p-8">
        
        <h1 className="text-2xl font-bold mb-2">
          Welcome Back, <span className="text-green-700">{trainer.name}</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Let’s help your clients stay on track today!
        </p>

        {hasClients ? (
          //==================== DASHBOARD WITH CLIENTS ====================//
          <div>
            <section className="bg-green-600 text-white p-6 rounded-xl mb-6 grid grid-cols-3 gap-6">
              <div className="bg-yellow-400 text-center p-4 rounded-xl">
                <h3 className="font-bold text-lg">Total Clients</h3>
                <p className="text-3xl font-bold">{trainer.assignedClients.length}</p>
              </div>

              <div className="bg-yellow-400 text-center p-4 rounded-xl">
                <h3 className="font-bold text-lg">Total Bookings</h3>
                <p className="text-3xl font-bold">11</p>
              </div>

              <div className="bg-yellow-400 text-center p-4 rounded-xl">
                <h3 className="font-bold text-lg">Total Earnings</h3>
                <p className="text-3xl font-bold">54K</p>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-md h-64">
              <h2 className="font-bold mb-4">Earning’s Chart</h2>
              {/* chart placeholder here */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">Chart</div>
            </section>
          </div>

        ) : (
          //==================== EMPTY STATE DASHBOARD ====================//
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-bold">No clients assigned yet</h2>
              <p className="text-gray-600 mt-2">
                Once clients are assigned to you, their details will appear here.
              </p>
            </div>
          </div>
        )}
      </main>

    </div>
  );
};

export default TrainerDashboard;

