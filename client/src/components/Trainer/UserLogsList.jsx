import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



const UserLogsList = () => {

    const [assignedClients, setAssignedClients] = useState([]);
  const token = localStorage.getItem("token");
  const [viewClients, setViewClients] = useState(false);
    const navigate = useNavigate();

  const fetchAssignedClients = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/trainer/clients`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    console.log(data);
    
    const clients = data.AssignedClients;
    const clientsWithLogs = [];

    for (let i = 0; i < clients.length; i++) {
      const client = clients[i];

      try {
        const logRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/log/trainer/user/${client._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        console.log(logRes);
        
        if (logRes.data?.log?.logs?.length > 0) {
          clientsWithLogs.push({ ...client});
        }
      } catch (err) {
    
      }
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
    <div className="h-full">
      {viewClients ? (
        <div className="bg-gradient-to-br from-green-50 to-gray-100 p-6 h-full rounded-xl">
          <h3 className="text-4xl font-semibold mt-6 text-green-800 border-l-4 border-green-600 pl-3">
            Below is the list of Users ,who have made Logs
          </h3>

          <div className="grid grid-cols-1 gap-5 mt-5">
            {assignedClients.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-xl p-5 rounded-xl border border-gray-300 flex gap-5 justify-between items-center hover:shadow-2xl hover:scale-[1.01] transition-all bg-gradient-to-r from-white to-green-50"
              >
                <img
                  src={user.profilePic || "https://via.placeholder.com/100"}
                  alt="user"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-md"
                />

                <div className="flex w-3/4 justify-between">
                  <div>
                  <h4 className="text-xl font-bold capitalize text-gray-900">
                    {user.name}
                  </h4>
                    <p className=" text-gray-700 capitalize">Age: {user.age} | Gender: {user.gender}</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800">Fitness Details</h5>
                    <p className=" text-gray-700 capitalize">Goal: {user.fitnessGoal}</p>
                    <p className="capitalize text-gray-700">
                      Focus Area: {user.focusArea?.join(", ")}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800">Health & Metrics</h5>
                    <p className="capitalize text-gray-700">
                      Health Issues: {user.healthIssues || "Not mentioned"}
                    </p>
                    <p className="capitalize text-gray-700">
                      Height: {user.profileMetrics?.height} cm | Weight: {user.profileMetrics?.weight} kg
                    </p>
                  </div>
                </div>


               <button
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all"
  onClick={() => navigate(`/trainer/viewLog/${user._id}`)}
>
  View Logs
</button>

              </div>
            ))}
          </div>
        </div>
            ) : (
                <div className="bg-gradient-to-br from-green-200 to-gray-300 p-6 h-full flex justify-center items-center rounded-xl">
                    <div className="border-2 w-2/4 p-10 rounded-xl flex flex-col bg-slate-100 border-white shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-900">
                            No client logs available yet!
                        </h2>
                        <p className="mt-2 text-gray-700 text-lg">
                            None of your assigned clients have submitted any workout or progress logs so far.
                            Once your clients start recording their sessions, you will be able to view and track their progress here.
                        </p>

                    </div>
                </div>
            )}
        </div>
    )
}

export default UserLogsList;