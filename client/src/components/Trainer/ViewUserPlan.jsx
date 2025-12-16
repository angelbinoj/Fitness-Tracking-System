import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewUserPlan = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const token = localStorage.getItem("token");

  const fetchPlan = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/plan/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlan(data.Plan);
    } catch (err) {
      console.error(err);
      setPlan(null);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  if (!plan) {
    return (
      <div className="flex justify-center items-center min-h-screen  p-4">
        <h2 className="text-xl sm:text-2xl font-bold text-red-600 text-center">
          No plan found
        </h2>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-10  min-h-screen">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 dark:text-green-500 mb-6 sm:mb-10 text-center md:text-left">
        Client Plan Overview
      </h2>

      {/* Plan Summary */}
      <div className="bg-green-100 p-4 sm:p-6 rounded-2xl mb-6 flex flex-col md:flex-row justify-between gap-4 text-green-900 font-bold uppercase">
        <span>Goal: {plan.fitnessGoal}</span>
        <span>Focus: {plan.focusArea.join(", ")}</span>
        <span>Duration: {plan.duration}</span>
      </div>

      {/* Workout Plan */}
      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-800 dark:text-green-500">Workout Plan</h3>
      <div className="flex flex-col gap-4">
        {plan.workout.map((w, i) => (
          <div
            key={i}
            className="p-4 sm:p-6 border rounded-2xl bg-green-50 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <p className="font-semibold text-green-700"><strong>Day:</strong> {w.day}</p>
            <p className="text-gray-800"><strong>Type:</strong> {w.exerciseType}</p>
            <p className="text-gray-800"><strong>Exercises:</strong> {w?.exercises?.join(", ")}</p>
            <p className="text-gray-800"><strong>Calories Burned:</strong> {w.caloriesBurned}</p>
          </div>
        ))}
      </div>

      {/* Nutrition Plan */}
      <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-green-800 dark:text-green-500">Nutrition Plan</h3>
      <p className="font-semibold text-green-700 dark:text-green-400 mb-3">Target Calories: {plan.nutrition.targetCaloriesPerDay}</p>
      <div className="flex flex-col gap-4">
        {plan.nutrition.meals.map((m, i) => (
          <div
            key={i}
            className="p-4 sm:p-6 border rounded-2xl bg-green-50 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <p className="font-semibold text-green-700 mb-1">Meal Type: {m.mealType}</p>
            {m.options.map((o, j) => (
              <p key={j} className="text-gray-800">
                {o.item} - {o.calories} cal
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUserPlan;
