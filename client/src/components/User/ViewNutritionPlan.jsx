import axios from "axios";
import { useEffect, useState } from "react";



const ViewNutritionPlan = () => {

    const [nutritionPlan, setnutritionPlan] = useState({});
    const [viewPlan, setViewPlan] = useState(false);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;

    const fetchnutritionPlan = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/plan/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        );
        console.log(data.Plan);
        setnutritionPlan(data.Plan);
        setViewPlan(nutritionPlan !== null);
    }

    useEffect(() => {
        fetchnutritionPlan();

    }, [])


    return (
        <div className="h-full">
            {viewPlan ? (
                <div className="px-10 py-5 flex flex-col gap-2">
                    <div className="bg-gradient-to-br from-green-200 to-gray-300 border-green-400 border-4 rounded-md">
                        <li className=" w-full flex justify-around items-center gap-3 uppercase p-4 border border-slate-200">
                            <span className="text-center font-bold text-lg">Fitness goal : {nutritionPlan.fitnessGoal}</span>
                            <span className="text-center font-bold text-lg">FocusArea : {nutritionPlan.focusArea.join(",")}</span>
                            <span className="text-center font-bold text-lg">Total Duration : {nutritionPlan.duration}</span>
                        </li>
                    </div>
                    <div className="bg-gradient-to-br from-green-200 to-gray-300 border-green-400 border-4 rounded-md">
                        <div className=" w-full grid grid-cols-[20%_80%] border border-slate-200">
                            <div className="flex flex-col h-full justify-center items-center font-bold text-lg border-r-4 border-green-400 px-3 text-center">TargetCaloriesPerDay- {nutritionPlan.nutrition.targetCaloriesPerDay}</div>
                            <div>
                                <div className="grid grid-cols-[40%_60%] border-b-4 border-green-400">
                                    <span className="text-center uppercase font-bold text-lg p-2 border-r-4 border-green-400">Meal Type</span>
                                    <span className="text-center uppercase font-bold text-lg p-2">options</span>
                                </div>
                                {nutritionPlan?.nutrition?.meals.map((m, index) => (
                                    <li key={index} className="grid grid-cols-[40%_60%]">
                                        <span className="text-center uppercase font-bold text-lg p-10 border-r-2 border-b-2 border-slate-50"> {m.mealType}</span>
                                        <span className="text-center border-b-2 border-slate-50 p-10">
                                            {m.options.map((o, i) => (
                                                <pre key={i}
                                                    className="capitalize flex justify-center items-center  font-semibold"
                                                >
                                                    {o.item} - <span className="font-bold">{o.calories}</span>
                                                </pre>
                                            ))}
                                        </span>
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-green-100 to-gray-200 p-6 h-full flex justify-center items-center rounded-xl">
                    <div className="border-2 w-2/4 p-10 rounded-xl bg-slate-100 border-white shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-900">No Nutrition Plan Assigned Yet!</h2>
                        <p className="mt-2 text-gray-700 text-lg">
                            Your nutrition plan isn't available yet. Please check back soon once your trainer adds it.
                        </p>

                    </div >
                </div >
            )}
        </div>
    )
}

export default ViewNutritionPlan;