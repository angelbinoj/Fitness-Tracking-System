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
    meals: [],
  });

  const addWorkoutDay = () => {
    setWorkout([
      ...workout,
      { day: "", exerciseType: "", exercises: [""], caloriesBurned: "" },
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
      meals: [...nutrition.meals, { mealType: "", options: [{ item: "", calories: "" }] }],
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

      setMessage("Plans assigned successfully!");
      setMsgColor("text-green-700");
      setTimeout(() => navigate(`/trainer/viewPlan/${id}`), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="py-6 px-6 md:px-14 bg-green-50 min-h-screen flex flex-col gap-6">

      {/* Client Info */}
      <div className="bg-white border border-green-300 rounded-xl shadow-md p-5">
        <div className="flex flex-col md:flex-row justify-between gap-4 text-lg">
          <p><span className="font-bold">Fitness Goal:</span> {clientData.fitnessGoal}</p>
          <p>
            <span className="font-bold">Focus Area:</span>{" "}
            {clientData?.focusArea?.join(", ")}
          </p>
          <p className="font-bold flex gap-2 items-center">
            Duration:
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border border-green-400 rounded-lg px-2 py-1 w-40"
            />
          </p>
        </div>
      </div>

      {/* Workout Section */}
      <div className="bg-white border border-green-300 rounded-xl shadow-lg p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-700">Workout Plan</h2>
          <button
            onClick={addWorkoutDay}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-lg"
          >
            + Add Day
          </button>
        </div>

        {workout.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-green-100 border border-green-300 rounded-lg flex flex-col gap-3"
          >
            <input
              className="border rounded-lg p-2"
              placeholder="Day (e.g., Monday)"
              value={item.day}
              onChange={(e) => {
                const copy = [...workout];
                copy[index].day = e.target.value;
                setWorkout(copy);
              }}
            />

            <input
              className="border rounded-lg p-2"
              placeholder="Exercise Type"
              value={item.exerciseType}
              onChange={(e) => {
                const copy = [...workout];
                copy[index].exerciseType = e.target.value;
                setWorkout(copy);
              }}
            />

            <input
              className="border rounded-lg p-2"
              placeholder="Calories Burned"
              type="number"
              value={item.caloriesBurned}
              onChange={(e) => {
                const copy = [...workout];
                copy[index].caloriesBurned = e.target.value;
                setWorkout(copy);
              }}
            />

            {item.exercises.map((exercise, i) => (
              <input
                key={i}
                className="border rounded-lg p-2 bg-white"
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
              onClick={() => addExercise(index)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm w-fit"
            >
              + Add Exercise
            </button>
          </div>
        ))}
      </div>

      {/* Nutrition Section */}
      <div className="bg-white border border-green-300 rounded-xl shadow-lg p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-700">Nutrition Plan</h2>
          <button
            onClick={addMeal}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            + Add Meal
          </button>
        </div>

        <input
          className="border rounded-lg p-2 bg-white"
          placeholder="Daily Target Calories"
          type="number"
          value={nutrition.targetCaloriesPerDay}
          onChange={(e) =>
            setNutrition({ ...nutrition, targetCaloriesPerDay: e.target.value })
          }
        />

        {nutrition.meals.map((meal, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-green-100 border border-green-300 flex flex-col gap-3"
          >
            <input
              className="border rounded-lg p-2"
              placeholder="Meal Type (Breakfast / Lunch)"
              value={meal.mealType}
              onChange={(e) => {
                const copy = { ...nutrition };
                copy.meals[index].mealType = e.target.value;
                setNutrition(copy);
              }}
            />

            {meal.options.map((opt, i) => (
              <div key={i} className="flex gap-3">
                <input
                  className="border rounded-lg p-2 w-1/2"
                  placeholder="Item"
                  value={opt.item}
                  onChange={(e) => {
                    const copy = { ...nutrition };
                    copy.meals[index].options[i].item = e.target.value;
                    setNutrition(copy);
                  }}
                />
                <input
                  className="border rounded-lg p-2 w-1/2"
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
              onClick={() => addMealOption(index)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm w-fit"
            >
              + Add Option
            </button>
          </div>
        ))}
      </div>

      {message && (
        <p className={`text-center text-lg font-bold ${msgColor}`}>{message}</p>
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold text-lg mt-2 shadow-md"
      >
        Assign Plan
      </button>
    </div>
  );
};

export default CreatePlan;
