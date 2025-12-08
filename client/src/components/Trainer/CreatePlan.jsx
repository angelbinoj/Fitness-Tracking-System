import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreatePlan = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [clientData, setClientData] = useState({});
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const fetchClientDetail = async () => {
    try {
      const client = await axios.get(
        `${import.meta.env.VITE_API_URL}/trainer/client/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(client.data.profile);
      setClientData(client.data.profile);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => {
    fetchClientDetail();
  }, [id]); 

  const [workout, setWorkout] = useState([]);
  const [nutrition, setNutrition] = useState({
    targetCaloriesPerDay: "",
    meals: []
  });


  const addWorkoutDay = () => {
    setWorkout([
      ...workout,
      { day: "", exerciseType: "", exercises: [""], caloriesBurned: "" }
    ]);
  };

  const addExercise = (index) => {
    const copy = [...workout];
    copy[index].exercises.push("");
    setWorkout(copy);
  };

  const addMeal = () => {
    setNutrition({
      ...nutrition,
      meals: [...nutrition.meals, { mealType: "", options: [{ item: "", calories: "" }] }]
    });
  };

  const addMealOption = (mealIndex) => {
    const copy = { ...nutrition };
    copy.meals[mealIndex].options.push({ item: "", calories: "" });
    setNutrition(copy);
  };


  const handleSubmit = async () => {
  if (workout.length === 0 && nutrition.meals.length === 0) {
    setMessage("Please assign at least one plan");
    setMsgColor("text-red-600");
    return;
  }

  try {
    const data = await axios.post(
      `${import.meta.env.VITE_API_URL}/plan/${id}`,
      { workout, nutrition, duration },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );
    console.log(data);
    
    setMessage("Plans assigned successfully!");
    setMsgColor("text-green-600");
    setTimeout(() => navigate(`/trainer/viewPlan/${id}`), 1500);

  } catch (err) {
    console.error(err);
    setMessage("Something went wrong");
  }
};


  return (
    <div className="py-6 px-10 flex flex-col gap-5">

    <div className="bg-gradient-to-br from-green-200 to-gray-300 border-green-400 border-4 rounded-md">
        <li className="w-full flex justify-between items-center gap-3 uppercase p-4">
          <span className="font-bold text-lg">Fitness Goal: {clientData.fitnessGoal}</span>
          <span className="font-bold text-lg">
            FocusArea: {clientData?.focusArea?.join(", ")}
          </span>
          <span className="font-bold text-lg">Duration: 
            <input type="text" name="duration"
             className="w-44 mx-2 rounded-lg font-medium px-2 border border-green-400"
             value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              /></span>
        </li>
      </div>

      <div className="bg-white border rounded-xl p-4 flex flex-col gap-3 shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Workout Plan</h2>
          <button onClick={addWorkoutDay} className="px-3 py-1 bg-green-600 text-white rounded-lg">
            + Add Day
          </button>
        </div>

        {workout.map((item, index) => (
          <div key={index} className="p-3 border rounded-md flex flex-col gap-2 bg-slate-200">
            <input
              className="border p-2 rounded"
              placeholder="Day (e.g., Monday)"
              value={item.day}
              onChange={(e) => {
                const copy = [...workout];
                copy[index].day = e.target.value;
                setWorkout(copy);
              }}
              required
            />

            <input
              className="border p-2 rounded"
              placeholder="Exercise Type"
              value={item.exerciseType}
              onChange={(e) => {
                const copy = [...workout];
                copy[index].exerciseType = e.target.value;
                setWorkout(copy);
              }}
              required
            />

            <input
              className="border p-2 rounded"
              placeholder="Calories Burned"
              type="number"
              value={item.caloriesBurned}
              onChange={(e) => {
                const copy = [...workout];
                copy[index].caloriesBurned = e.target.value;
                setWorkout(copy);
              }}
              required
            />

            {item.exercises.map((exercise, i) => (
              <input
                key={i}
                className="border p-2 rounded"
                placeholder="Exercise"
                value={exercise}
                onChange={(e) => {
                  const copy = [...workout];
                  copy[index].exercises[i] = e.target.value;
                  setWorkout(copy);
                }}
              />
            ))}

            <button
              className="bg-gray-400 px-2 py-1 text-white font-semibold rounded text-sm"
              onClick={() => addExercise(index)}
            >
              + Add Exercise
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl p-4 flex flex-col gap-3 shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Nutrition Plan</h2>
          <button onClick={addMeal} className="px-3 py-1 bg-green-600 text-white rounded-lg">
            + Add Meal
          </button>
        </div>

        <input
          className="border p-2 rounded bg-white"
          placeholder="Daily Target Calories"
          type="number"
          value={nutrition.targetCaloriesPerDay}
          onChange={(e) => setNutrition({ ...nutrition, targetCaloriesPerDay: e.target.value })}
          required
        />

        {nutrition.meals.map((meal, index) => (
          <div key={index} className="p-3 border rounded-md bg-slate-200 flex flex-col gap-2">
            <input
              className="border p-2 rounded"
              placeholder="Meal Type (Breakfast / Lunch)"
              value={meal.mealType}
              onChange={(e) => {
                const copy = { ...nutrition };
                copy.meals[index].mealType = e.target.value;
                setNutrition(copy);
              }}
              required
            />

            {meal.options.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="border p-2 rounded w-1/2"
                  placeholder="Item"
                  value={opt.item}
                  onChange={(e) => {
                    const copy = { ...nutrition };
                    copy.meals[index].options[i].item = e.target.value;
                    setNutrition(copy);
                  }}
                />
                <input
                  className="border p-2 rounded w-1/2"
                  placeholder="Calories"
                  type="number"
                  value={opt.calories}
                  onChange={(e) => {
                    const copy = { ...nutrition };
                    copy.meals[index].options[i].calories = e.target.value;
                    setNutrition(copy);
                  }}
                />
              </div>
            ))}

            <button
              className="bg-gray-400 px-2 py-1 text-white font-semibold rounded text-sm"
              onClick={() => addMealOption(index)}
            >
              + Add Option
            </button>
          </div>
        ))}
      </div>

      {message && (
  <p className={`text-center text-lg font-semibold my-2 ${msgColor}`}>
    {message}
  </p>
)}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg"
      >
        Assign Plan
      </button>
    </div>
  );
};

export default CreatePlan;


