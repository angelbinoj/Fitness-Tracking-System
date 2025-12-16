import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewUserLogs = () => {
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const fetchLogs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/log/trainer/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setLogs(data.log?.logs || []);
    } catch (err) {
      console.error(err);
      setLogs([]);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (!logs || logs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
        <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-green-200 max-w-md text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">No Logs Found</h2>
          <p className="text-gray-700 text-base sm:text-lg">
            This user has no workout or nutrition logs yet. Once they start logging their activities, you'll see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-10 min-h-screen">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900  dark:text-green-500 mb-6 sm:mb-10 text-center md:text-left">
        User Logs
      </h2>

      <div className="flex flex-col gap-6">
        {logs.map((log, index) => (
          <div
            key={index}
            className="bg-white dark:bg-green-50 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-lg sm:text-xl font-bold text-green-700 mb-2">{log.date}</p>

            {/* Workout Section */}
            <div className="mt-2">
              <p className="font-semibold text-green-800 text-sm sm:text-base mb-1">Workout</p>
              <p className="text-gray-700 text-sm sm:text-base">Description: {log.workout?.description || "N/A"}</p>
              <p className="text-gray-700 text-sm sm:text-base">Calories Burned: {log.workout?.caloriesBurned || 0}</p>
            </div>

            {/* Nutrition Section */}
            <div className="mt-3">
              <p className="font-semibold text-green-800 text-sm sm:text-base mb-1">Nutrition</p>
              {log.nutrition?.meals && log.nutrition.meals.length > 0 ? (
                <ul className="list-disc ml-5 text-gray-700 text-sm sm:text-base">
                  {log.nutrition.meals.map((meal, i) => (
                    <li key={i}>
                      <strong>{meal.mealType}:</strong> {meal.description} ({meal.calories} cal)
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 text-sm sm:text-base">No meal details</p>
              )}
              <p className="font-semibold mt-1 text-gray-800 text-sm sm:text-base">
                Total Calories: {log.nutrition?.totalCalories || 0} cal
              </p>
            </div>

            {/* Energy and Notes */}
            <div className="mt-3 flex flex-col gap-1">
              <p className="text-gray-800 text-sm sm:text-base">
                <strong>Energy Level:</strong> {log.energyLevel || "N/A"}
              </p>
              <p className="text-gray-800 text-sm sm:text-base">
                <strong>Notes:</strong> {log.notes || "None"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUserLogs;
