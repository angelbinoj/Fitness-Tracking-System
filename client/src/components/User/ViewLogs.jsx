import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdAdd } from "react-icons/md";

const ViewLogs = () => {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchLogs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/log`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setLogs(data.logs?.logs || []);
    } catch (err) {
      console.error(err);
      setLogs([]);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleAddLog = () => {
    navigate("/user/createLog");
  };

  if (logs.length === 0) {
    return (
      <div className="bg-green-50 p-4 sm:p-6 min-h-screen flex justify-center items-center">
        <div className="border-2 w-full sm:w-3/4 md:w-1/2 p-6 sm:p-10 rounded-2xl bg-slate-100 shadow-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
            You have not made any logs yet!
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            You haven’t created any workout or progress logs yet. Start recording your sessions
            to monitor your improvements and stay motivated throughout your fitness journey.
          </p>
          <button
            onClick={handleAddLog}
            className="mt-6 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold uppercase text-lg shadow-md transition-all"
          >
            Add Log <MdAdd className="text-2xl font-extrabold" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-10 bg-green-50 min-h-screen flex flex-col gap-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-6 text-center md:text-left">
        Your Logs
      </h2>

      <div className="flex flex-col gap-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-3"
          >
            <p className="text-lg sm:text-xl font-bold text-green-700">{log.date}</p>

            {/* Workout Section */}
            <div className="mt-2">
              <p className="font-semibold text-gray-900">Workout</p>
              <p className="text-gray-700">Description: {log.workout?.description}</p>
              <p className="text-gray-700">Calories Burned: {log.workout?.caloriesBurned}</p>
            </div>

            {/* Nutrition Section */}
            <div className="mt-2">
              <p className="font-semibold text-gray-900">Nutrition</p>
              {log.nutrition?.meals && log.nutrition.meals.length > 0 ? (
                <ul className="list-disc ml-5 text-gray-700">
                  {log.nutrition.meals.map((meal, i) => (
                    <li key={i} className="text-sm sm:text-base">
                      <strong>{meal.mealType}:</strong> {meal.description} ({meal.calories} cal)
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No meal details</p>
              )}
              <p className="font-semibold mt-1">Total Calories: {log.nutrition?.totalCalories} cal</p>
            </div>

            <p className="mt-2 text-gray-800"><strong>Energy Level:</strong> {log.energyLevel}</p>
            <p className="mt-1 text-gray-800"><strong>Notes:</strong> {log.notes}</p>
          </div>
        ))}

        {/* Add Log Button */}
        <button
          onClick={handleAddLog}
          className="mt-4 self-center sm:self-start flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-2xl font-semibold uppercase text-md sm:text-lg shadow-md transition-all"
        >
          Add Today's Log <MdAdd className="text-xl sm:text-2xl font-extrabold" />
        </button>
      </div>
    </div>
  );
};

export default ViewLogs;
