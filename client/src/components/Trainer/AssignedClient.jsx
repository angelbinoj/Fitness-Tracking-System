import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const AssignedClient = () => {
  const [assignedClients, setAssignedClients] = useState([]);
  const token = localStorage.getItem("token");
  const [viewClients, setViewClients] = useState(false);
  const trainer = JSON.parse(localStorage.getItem("user"));
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

      const clients = Array.isArray(data?.AssignedClients)
        ? data.AssignedClients
        : [];

      const clientsWithPlan = [];
      for (let i = 0; i < clients.length; i++) {
        const client = clients[i];
        try {
          await axios.get(`${import.meta.env.VITE_API_URL}/plan/${client._id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          clientsWithPlan.push({ ...client, hasPlan: true });
        } catch (err) {
          clientsWithPlan.push({ ...client, hasPlan: false });
        }
      }

      setAssignedClients(clientsWithPlan);
      setViewClients(clientsWithPlan?.length > 0);
    } catch (error) {
      console.log("Error fetching assigned clients:", error);
    }
  };

  useEffect(() => {
    fetchAssignedClients();
  }, []);

  // Listen for unread counts from Firestore
 useEffect(() => {
  const unsubscribes = assignedClients.map((client, index) => {
    const chatId = `${client._id}_${trainer._id}`;
    const chatDocRef = doc(db, "chats", chatId);

    return onSnapshot(chatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const unreadCount = docSnap.data().unreadCount || 0;
        setAssignedClients((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], unreadCount };
          return updated;
        });
      }
    });
  });

  return () => unsubscribes.forEach((u) => u());
}, [assignedClients]);


  return (
    <div className="h-screen">
      {viewClients ? (
        <div className="bg-gradient-to-br from-green-50 to-gray-100 p-4 md:p-8 rounded-xl min-h-screen">
          <h3 className="text-3xl md:text-4xl font-semibold mt-4 text-green-800 border-l-4 border-green-600 pl-3">
            Assigned Clients
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-6">
            {assignedClients.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-lg p-5 md:p-6 rounded-xl border border-gray-200
                       hover:shadow-2xl transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <img
                    src={user.profilePic || "https://via.placeholder.com/100"}
                    alt="user"
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-green-500 shadow-md"
                  />

                  <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold capitalize text-gray-900">
                        {user.name}
                      </h4>
                      <p className="text-gray-700 capitalize mt-1">
                        Age: {user.age} | Gender: {user.gender}
                      </p>
                    </div>

                    <div className="flex-1">
                      <h5 className="font-bold text-gray-800 mb-1">Fitness Details</h5>
                      <p className="text-gray-700 capitalize">Goal: {user.fitnessGoal}</p>
                      <p className="capitalize text-gray-700">
                        Focus Area: {user.focusArea?.join(", ") || "Not specified"}
                      </p>
                    </div>

                    <div className="flex-1">
                      <h5 className="font-bold text-gray-800 mb-1">Health & Metrics</h5>
                      <p className="capitalize text-gray-700">
                        Health Issues: {user.healthIssues || "Not mentioned"}
                      </p>
                      <p className="capitalize text-gray-700">
                        Height: {user.profileMetrics?.height} cm | Weight: {user.profileMetrics?.weight} kg
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col md:flex-row justify-center md:justify-end items-center gap-3">
                  {/* Chat Icon */}
                  <div className="relative">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-md transition-all"
                      onClick={() => navigate(`/trainer/chat/${user._id}`)}
                    >
                      <FaComments className="h-5 w-5" />
                      {user.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 text-xs">
                          {user.unreadCount}
                        </span>
                      )}
                    </button>
                  </div>

                  {user.hasPlan ? (
                    <button
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-all"
                      onClick={() => navigate(`/trainer/viewPlan/${user._id}`)}
                    >
                      View Plan
                    </button>
                  ) : (
                    <button
                      className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-all"
                      onClick={() => navigate(`/trainer/createPlan/${user._id}`)}
                    >
                      Assign Plan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-green-100 to-gray-200 p-6 flex justify-center items-center rounded-xl h-full min-h-[70vh]">
          <div className="border w-full md:w-2/3 lg:w-1/2 p-8 md:p-10 rounded-xl bg-white shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900">
              No Clients Yet!
            </h2>
            <p className="mt-3 text-gray-700 text-base md:text-lg leading-relaxed">
              You currently don't have any assigned clients. Once users select you as their trainer,
              their details, fitness goals, and health profiles will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedClient;
