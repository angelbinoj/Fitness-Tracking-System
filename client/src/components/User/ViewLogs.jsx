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
        {  headers: { Authorization: `Bearer ${token}` },
                withCredentials: true, }
      );
      setLogs(data.logs?.logs || []);
      console.log(data.logs.logs);
      
    } catch (err) {
      console.error(err);
      setLogs([]);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleAddLog = () => {
    navigate("/user/createLog"); // navigate to log creation page
  };

  if (logs.length === 0) {
    return (
      <div className="bg-gradient-to-br from-green-200 to-gray-300 p-6 h-full flex justify-center items-center rounded-xl">
        <div className="border-2 w-2/4 p-10 rounded-xl flex flex-col bg-slate-100 border-white shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-900">You have not made any logs yet!</h2>
          <p className="mt-2 text-gray-700 text-lg">
            You haven’t created any workout or progress logs yet. Start recording your sessions
            to monitor your improvements and stay motivated throughout your fitness journey.
          </p>
          <button
            onClick={handleAddLog}
            className="mt-4 flex justify-center items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold uppercase text-xl shadow-md transition-all"
          >
            Add Log <MdAdd className="text-2xl font-extrabold" />
          </button>
        </div>
      </div>
    );
  }

  // If logs exist
  return (
    <div className="px-20 py-10 h-full bg-green-50">
      <h2 className="text-3xl font-bold text-green-900 mb-6">Your Logs</h2>

      <div className="flex flex-col gap-4">
        {logs.map((log, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
            <p className="text-lg font-bold text-green-700">{log.date}</p>

            <div className="mt-2">
              <p className="font-semibold text-gray-900">Workout</p>
              <p className="text-gray-700">Description: {log.workout?.description}</p>
              <p className="text-gray-700">Calories Burned: {log.workout?.caloriesBurned}</p>
            </div>

            <div className="mt-2">
              <p className="font-semibold text-gray-900">Nutrition</p>
              {log.nutrition?.meals && log.nutrition.meals.length > 0 ? (
                <ul className="list-disc ml-5 text-gray-700">
                  {log.nutrition.meals.map((meal, i) => (
                    <li key={i}>
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

        <button
          onClick={handleAddLog}
          className="mt-3 flex justify-center items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold uppercase text-md shadow-md transition-all"
        >
          Add Today's Log <MdAdd className="text-xl font-extrabold" />
        </button>
      </div>
    </div>
  );
};

export default ViewLogs;
