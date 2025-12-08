import axios from "axios";
import { useEffect, useState } from "react";



const ViewWorkoutPlan = () => {

    const [workoutPlan, setWorkoutPlan] = useState({});
    const [viewPlan, setViewPlan] = useState(false);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;

    const fetchWorkoutPlan = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/plan/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
        setWorkoutPlan(data.Plan);
        setViewPlan(workoutPlan !== null);
    }

    useEffect(() => {
        fetchWorkoutPlan();
    }, [])


    return (
        <div className="h-full">
            {viewPlan ? (
                <div className="px-10 py-5 flex flex-col gap-2">
                    <div className="bg-gradient-to-br from-green-200 to-gray-300 border-green-400 border-4 rounded-md">
                        <li className=" w-full flex justify-around items-center gap-3 uppercase p-4 border border-slate-200">
                            <span className="text-center font-bold text-lg">Fitness goal : {workoutPlan.fitnessGoal}</span>
                            <span className="text-center font-bold text-lg">FocusArea : {workoutPlan.focusArea.join(",")}</span>
                            <span className="text-center font-bold text-lg">Total Duration : {workoutPlan.duration}</span>
                        </li>
                    </div>
                    <ul className="bg-gradient-to-br from-green-200 to-gray-300 border-green-400 border-4 rounded-md">
                        <li className=" w-full grid grid-cols-[10%_28%_40%_22%] border border-slate-200">
                            <span className="uppercase flex justify-center items-center border-r-4 border-b-4 border-green-400 font-bold text-lg">day</span>
                            <span className="uppercase flex justify-center items-center border-r-4 border-b-4 border-green-400 font-bold text-lg">exercise type</span>
                            <span className="uppercase flex justify-center items-center border-r-4 border-b-4 border-green-400 font-bold text-lg">Exercises</span>
                            <span className="uppercase flex justify-center items-center border-b-4 border-green-400 font-bold text-lg p-1">total calories burned</span>
                        </li>
                        {workoutPlan?.workout?.map((w, index) => (
                            <li key={index} className=" w-full grid grid-cols-[10%_28%_40%_22%] ">
                                <span className="uppercase flex justify-center items-center border p-2 border-slate-50 font-semibold">{w.day}</span>
                                <span className="uppercase flex justify-center items-center border border-slate-50 font-semibold">{w.exerciseType}</span>
                                <span className=" border border-slate-50 p-2">
                                    {w.exercises && w.exercises.length > 0 ? (
                                        w.exercises.map((e, i) => (
                                            <span key={i}
                                                className="uppercase flex justify-center items-center font-semibold"
                                            >
                                                {e}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="uppercase flex justify-center items-center p-2 font-semibold">
                                            No exercises scheduled today.
                                        </span>
                                    )}
                                </span>
                                <span className="uppercase flex justify-center items-center border border-slate-50 font-semibold">{w.caloriesBurned}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-green-100 to-gray-200 p-6 h-full flex justify-center items-center rounded-xl">
                    <div className="border-2 w-2/4 p-10 rounded-xl bg-slate-100 border-white shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-900">No Workout Plan Assigned Yet!</h2>
                        <p className="mt-2 text-gray-700 text-lg">
                            Your workout plan isn't available yet. Please check back soon once your trainer adds it.
                        </p>

                    </div >
                </div >
            )}
        </div>
    )
}

export default ViewWorkoutPlan;