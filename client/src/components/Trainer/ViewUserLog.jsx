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
        {  headers: { Authorization: `Bearer ${token}` },
                withCredentials: true, }
      );
      setLogs(data.log?.logs || []);
      console.log(data.log.logs);
      
    } catch (err) {
      console.error(err);
      setLogs([]);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);


  
  return (
    <div className="px-20 py-10 h-full bg-green-50">
      <h2 className="text-3xl font-bold text-green-900 mb-6">User Log</h2>

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
      </div>
    </div>
  );
};

export default ViewUserLogs;
