import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewUserPlan = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchPlan = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/plan/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPlan(data.Plan);
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  return (
    <div className="p-6">
      {!plan ? (
        <h2 className="text-xl font-bold text-center text-red-600">No plan found</h2>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Client Plan Overview</h2>
          
          <div className="bg-green-100 p-4 rounded-md mb-4 flex justify-between uppercase font-bold">
            <span>Goal: {plan.fitnessGoal}</span>
            <span>Focus: {plan.focusArea.join(", ")}</span>
            <span>Duration: {plan.duration}</span>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-2">Workout Plan</h3>
          {plan.workout.map((w, i) => (
            <div key={i} className="p-3 border rounded-md bg-slate-100 my-2">
              <p><strong>Day:</strong> {w.day}</p>
              <p><strong>Type:</strong> {w.exerciseType}</p>
              <p><strong>Exercises:</strong> {w?.exercises?.join(", ")}</p>
              <p><strong>Calories Burned:</strong> {w.caloriesBurned}</p>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-6 mb-2">Nutrition Plan</h3>
          <p className="font-semibold mb-2">Target Calories: {plan.nutrition.targetCaloriesPerDay}</p>
          {plan.nutrition.meals.map((m, i) => (
            <div key={i} className="p-3 border rounded-md bg-slate-100 my-2">
              <p><strong>Meal Type:</strong> {m.mealType}</p>
              {m.options.map((o, j) => (
                <p key={j}>{o.item} - {o.calories} cal</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewUserPlan;
