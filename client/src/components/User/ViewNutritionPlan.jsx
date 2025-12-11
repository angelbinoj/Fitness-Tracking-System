import axios from "axios";
import { useEffect, useState } from "react";

const ViewNutritionPlan = () => {
  const [nutritionPlan, setNutritionPlan] = useState({});
  const [viewPlan, setViewPlan] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const fetchNutritionPlan = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/plan/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setNutritionPlan(data.Plan);
      setViewPlan(data.Plan != null);
    } catch (err) {
      console.error(err);
      setViewPlan(false);
    }
  };

  useEffect(() => {
    fetchNutritionPlan();
  }, []);

  if (!viewPlan) {
    return (
      <div className="bg-green-50 p-4 sm:p-6 min-h-screen flex justify-center items-center">
        <div className="border-2 w-full sm:w-3/4 md:w-1/2 p-6 sm:p-10 rounded-2xl bg-slate-100 shadow-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
            No Nutrition Plan Assigned Yet!
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            Your nutrition plan isn't available yet. Please check back soon once your trainer adds it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-10 bg-green-50 min-h-screen flex flex-col gap-6">
      
      {/* Plan Overview */}
      <div className="bg-green-100 border-4 border-green-400 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm sm:text-base md:text-lg font-bold uppercase text-green-900">
          Fitness Goal: {nutritionPlan.fitnessGoal}
        </span>
        <span className="text-sm sm:text-base md:text-lg font-bold uppercase text-green-900">
          Focus Area: {nutritionPlan.focusArea.join(", ")}
        </span>
        <span className="text-sm sm:text-base md:text-lg font-bold uppercase text-green-900">
          Duration: {nutritionPlan.duration}
        </span>
      </div>

      {/* Nutrition Plan */}
      <div className="bg-green-100 border-4 border-green-400 rounded-2xl overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Target Calories */}
          <div className="grid grid-cols-[25%_75%] border-b-4 border-green-400">
            <div className="flex justify-center items-center font-bold text-lg border-r-4 border-green-400 p-3 text-center">
              Target Calories Per Day: {nutritionPlan.nutrition.targetCaloriesPerDay}
            </div>
            <div>
              {/* Header */}
              <div className="grid grid-cols-[40%_60%] border-b-4 border-green-400">
                <span className="text-center uppercase font-bold text-lg p-2 border-r-4 border-green-400">Meal Type</span>
                <span className="text-center uppercase font-bold text-lg p-2">Options</span>
              </div>
              {/* Meal Items */}
              {nutritionPlan?.nutrition?.meals.map((m, index) => (
                <div key={index} className="grid grid-cols-[40%_60%] border-b border-green-300">
                  <span className="text-center uppercase font-bold text-base sm:text-lg p-4 border-r border-green-300 flex justify-center items-center">{m.mealType}</span>
                  <span className="text-center p-4 border-green-300 flex flex-col gap-1">
                    {m.options.map((o, i) => (
                      <div key={i} className="capitalize flex justify-center items-center font-semibold">
                        {o.item} - <span className="font-bold">{o.calories}</span>
                      </div>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewNutritionPlan;
