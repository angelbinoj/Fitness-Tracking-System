import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateLog = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const trainerId = user?.assignedTrainer;
  const navigate = useNavigate();

  const [workout, setWorkout] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [meals, setMeals] = useState([
    { mealType: "Breakfast", description: "", calories: "" },
    { mealType: "Lunch", description: "", calories: "" },
    { mealType: "Dinner", description: "", calories: "" },
    { mealType: "Snack", description: "", calories: "" },
  ]);
  const [energyLevel, setEnergyLevel] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleMealChange = (index, field, value) => {
    const newMeals = [...meals];
    newMeals[index][field] = value;
    setMeals(newMeals);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/log`,
        {
          trainerId,
          workout: { description: workout, caloriesBurned },
          nutrition: { meals },
          energyLevel,
          notes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      setTimeout(() => navigate("/user/logs"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error saving log");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-4 sm:p-6 md:p-10 bg-green-400 rounded-2xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center uppercase mb-6 text-green-900">
        Today's Fitness Log
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Workout Section */}
        <div className="bg-green-200 p-4 sm:p-6 rounded-xl flex flex-col gap-4">
          <div>
            <label className="text-lg sm:text-xl font-bold text-gray-800">Workout</label>
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
              rows={2}
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-lg sm:text-base font-medium text-gray-800">Calories Burned</label>
            <input
              type="number"
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>

        {/* Nutrition Section */}
        <div className="bg-green-200 p-4 sm:p-6 rounded-xl flex flex-col gap-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Nutrition</h3>
          {meals.map((meal, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:gap-4 gap-2">
              <span className="font-medium w-full sm:w-1/4">{meal.mealType}</span>
              <input
                type="text"
                placeholder="Description"
                value={meal.description}
                onChange={(e) => handleMealChange(index, "description", e.target.value)}
                className="w-full sm:w-3/4 border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                required
              />
              <input
                type="number"
                placeholder="Calories"
                value={meal.calories}
                onChange={(e) => handleMealChange(index, "calories", e.target.value)}
                className="w-full sm:w-1/4 border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          ))}
        </div>

        {/* Energy Level */}
        <div>
          <label className="block text-lg sm:text-base font-medium text-gray-700">Energy Level</label>
          <input
            type="text"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-lg sm:text-base font-medium text-gray-700">Notes (Optional)</label>
          <textarea
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white text-lg font-bold rounded-xl hover:bg-green-700 transition-all shadow-md"
        >
          Save Today's Log
        </button>
      </form>

      {message && <p className="text-center text-slate-900 text-sm mt-4">{message}</p>}
    </div>
  );
};

export default CreateLog;
