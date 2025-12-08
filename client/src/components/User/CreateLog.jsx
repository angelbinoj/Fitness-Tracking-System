import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateLog = () => {

const token =localStorage.getItem('token');
const user= JSON.parse(localStorage.getItem('user'));
const trainerId= user.trainerId;
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
          workout: { description: workout , caloriesBurned: caloriesBurned},
          nutrition: { meals },
          energyLevel,
          notes,
        },
        {  headers: { Authorization: `Bearer ${token}` },
                withCredentials: true, }
      );
      setMessage(response.data.message);
      console.log(response);
       setTimeout(() => navigate("/user/logs"), 1500);
      
    } catch (err) {
      setMessage(err.response?.data?.error || "Error saving log");
    }
  };

  return (
    <div className="w-3/4 p-6 mx-auto my-6 bg-green-400 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center uppercase mb-4">Today's Fitness Log</h2>

      <form onSubmit={handleSubmit} className="my-3 flex flex-col gap-5">
        <div className="bg-green-200 p-4 rounded-md">
            <div>
          <label className="text-xl font-bold text-gray-800">Workout</label>
          <textarea
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            rows={2}
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            required
          />
        </div>
        <div>
          <label className=" font-medium text-gray-800">Calories Burned </label>
          <input
            type="number"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        </div>

        <div className="bg-green-200 p-4 rounded-md">
            <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Nutrition</h3>
          {meals.map((meal, index) => (
            <div key={index} className="mb-2 space-y-1">
              <span className="font-medium">{meal.mealType}</span>
              <input
                type="text"
                placeholder="Description"
                value={meal.description}
                onChange={(e) => handleMealChange(index, "description", e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <input
                type="number"
                placeholder="Calories"
                value={meal.calories}
                onChange={(e) => handleMealChange(index, "calories", e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Energy Level</label>
          <input
            type="text"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white text-lg border border-white font-bold rounded-md hover:bg-green-700 transition"
        >
          Save Today's Log
        </button>
      </form>

      {message && <p className="text-center text-slate-900 text-sm mt-2">{message}</p>}
    </div>
  );
}


export default CreateLog;