import axios from "axios";
import { useEffect, useState } from "react";

const AssignedClient = () => {
  const [assignedClients, setAssignedClients] = useState([]);
  const token = localStorage.getItem("token");
  const [viewClients, setViewClients] = useState(false);

  const fetchAssignedClients = async () => {
    try {
      const { data } = await axios.get(
        "https://fitness-system-backend.vercel.app/api/trainer/clients",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("API Response:", data);
      setAssignedClients(data.assignedClients);
      if (data.assignedClients.length > 0) {
  setViewClients(true);
} 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssignedClients();
     console.log("Assigned Clients State:", assignedClients);
  }, []);

  return (
    <div className="h-full">
      {viewClients ? (
        <div className="bg-gradient-to-br from-green-50 to-gray-100 p-6 h-full rounded-xl">
          <h3 className="text-4xl font-semibold mt-6 capitalize text-green-800 border-l-4 border-green-600 pl-3">
            Below is the list of Users
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {assignedClients.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-xl p-5 rounded-xl border border-gray-300 flex gap-5 items-center hover:shadow-2xl hover:scale-[1.01] transition-all bg-gradient-to-r from-white to-green-50"
              >
                <img
                  src={user.profilePic || "https://via.placeholder.com/100"}
                  alt="user"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-md"
                />

                <div className="flex flex-col flex-1">
                  <h4 className="text-xl font-bold capitalize text-gray-900">{user.name}</h4>
                  <p className="text-gray-700 text-sm capitalize">
                    fitness goal: <span className="font-medium">{user.fitnessGoal}</span>
                  </p>
                  <p className="text-gray-700 text-sm">
                    focus area: <span className="font-medium">{user?.focusArea?.join(", ")}</span>
                  </p>
                  <p className="text-gray-700 text-sm">
                    health issues: <span className="font-medium">{user.healthIssues}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-green-100 to-gray-200 p-6 h-full flex justify-center items-center rounded-xl">
            <div className="border-2 w-2/4 p-10 rounded-xl bg-slate-100 border-white shadow-lg text-center">
                <h2 className="text-2xl font-bold text-green-900">No Clients Yet!</h2>
          <p className="mt-2 text-gray-700 text-lg">
            You don't have any assigned clients yet. Once users choose you as their trainer,
            their profiles, workout details, and scheduling options will appear here.
            Stay active and ready to guide new clients on their fitness journey.
          </p>
            </div>
        </div>
      )}
    </div>
  );
};

export default AssignedClient;
