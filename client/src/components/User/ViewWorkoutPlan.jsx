import axios from "axios";
import { useEffect, useState } from "react";

const ViewWorkoutPlan = () => {
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [viewPlan, setViewPlan] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const fetchWorkoutPlan = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/plan/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setWorkoutPlan(data.Plan);
      setViewPlan(data.Plan != null);
    } catch (err) {
      console.error(err);
      setViewPlan(false);
    }
  };

  useEffect(() => {
    fetchWorkoutPlan();
  }, []);

  if (!viewPlan) {
    return (
      <div className=" p-4 sm:p-6 min-h-screen flex justify-center items-center">
        <div className="border-2 w-full sm:w-3/4 md:w-1/2 p-6 sm:p-10 rounded-2xl bg-slate-100 dark:bg-green-50 shadow-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
            No Workout Plan Assigned Yet!
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            Your workout plan isn't available yet. Please check back soon once your trainer adds it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-10  min-h-screen flex flex-col gap-6">
      
      {/* Plan Overview */}
      <div className="bg-green-100 border-4 border-green-400 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm sm:text-base md:text-lg font-bold uppercase text-green-900">
          Fitness Goal: {workoutPlan.fitnessGoal}
        </span>
        <span className="text-sm sm:text-base md:text-lg font-bold uppercase text-green-900">
          Focus Area: {workoutPlan.focusArea.join(", ")}
        </span>
        <span className="text-sm sm:text-base md:text-lg font-bold uppercase text-green-900">
          Duration: {workoutPlan.duration}
        </span>
      </div>

      {/* Workout Plan Grid */}
      <div className="bg-green-100 border-4 border-green-400 rounded-2xl overflow-x-auto">
        <ul className="min-w-[700px]">
          {/* Header */}
          <li className="grid grid-cols-4 border-b-4 border-green-400 text-center uppercase font-bold text-sm sm:text-base">
            <span className="p-2 border-r-4 border-green-400">Day</span>
            <span className="p-2 border-r-4 border-green-400">Exercise Type</span>
            <span className="p-2 border-r-4 border-green-400">Exercises</span>
            <span className="p-2">Total Calories Burned</span>
          </li>

          {/* Workout Items */}
          {workoutPlan?.workout?.map((w, index) => (
            <li
              key={index}
              className="grid grid-cols-4 text-center text-sm sm:text-base border-b border-green-300"
            >
              <span className="p-2 border-r border-green-300 font-semibold">{w.day}</span>
              <span className="p-2 border-r border-green-300 font-semibold">{w.exerciseType}</span>
              <span className="p-2 border-r border-green-300">
                {w.exercises && w.exercises.length > 0 ? (
                  <ul className="flex flex-col gap-1">
                    {w.exercises.map((e, i) => (
                      <li key={i} className="font-semibold">{e}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="font-semibold">No exercises scheduled today.</span>
                )}
              </span>
              <span className="p-2 font-semibold">{w.caloriesBurned}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewWorkoutPlan;
