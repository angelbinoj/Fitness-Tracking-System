import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogsList = () => {
  const [assignedClients, setAssignedClients] = useState([]);
  const token = localStorage.getItem("token");
  const [viewClients, setViewClients] = useState(false);
  const navigate = useNavigate();

  const fetchAssignedClients = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/trainer/clients`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      const clients = data.AssignedClients;
      const clientsWithLogs = [];

      for (let i = 0; i < clients.length; i++) {
        const client = clients[i];
        try {
          const logRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/log/trainer/user/${client._id}`,
            { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
          );
          if (logRes.data?.log?.logs?.length > 0) {
            clientsWithLogs.push({ ...client });
          }
        } catch (err) {}
      }

      setAssignedClients(clientsWithLogs);
      setViewClients(clientsWithLogs.length > 0);
    } catch (error) {
      console.log("Error fetching assigned clients:", error);
    }
  };

  useEffect(() => {
    fetchAssignedClients();
  }, [viewClients]);

  return (
    <div className="min-h-screen p-6 md:p-10 bg-green-50">
      {viewClients ? (
        <div>
          <h3 className="text-4xl font-semibold mt-6 text-green-800 border-l-4 border-green-600 pl-3">
            Users with Logs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {assignedClients.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl border border-green-200 shadow-md p-5 flex flex-col gap-4 hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profilePic || "https://via.placeholder.com/100"}
                    alt="user"
                    className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-md"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-green-800 capitalize">{user.name}</h4>
                    <p className="text-gray-700">Age: {user.age} | Gender: {user.gender}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <h5 className="font-semibold text-green-700">Fitness Details</h5>
                    <p className="text-gray-700">Goal: {user.fitnessGoal}</p>
                    <p className="text-gray-700">
                      Focus Area: {user.focusArea?.join(", ")}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-green-700">Health & Metrics</h5>
                    <p className="text-gray-700">
                      Health Issues: {user.healthIssues || "Not mentioned"}
                    </p>
                    <p className="text-gray-700">
                      Height: {user.profileMetrics?.height} cm | Weight: {user.profileMetrics?.weight} kg
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/trainer/viewLog/${user._id}`)}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all"
                >
                  View Logs
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-16">
          <div className="bg-white border border-green-200 shadow-lg rounded-xl p-10 max-w-xl text-center">
            <h2 className="text-2xl font-bold text-green-800">
              No client logs available yet!
            </h2>
            <p className="mt-3 text-gray-700 text-lg">
              None of your assigned clients have submitted any workout or progress logs yet.
              Once your clients start recording their sessions, you will be able to view and track their progress here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLogsList;
