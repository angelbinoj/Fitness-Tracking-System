import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHand } from "react-icons/gi";


function UserOnboarding(){

    const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
  fitnessGoal: "",
  focusArea: [],
  height: "",
  weight: "",
  healthIssues: ""
});
const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "focusArea") {
    let updated = formData.focusArea.includes(value)
      ? formData.focusArea.filter((v) => v !== value) 
      : [...formData.focusArea, value];              

    setFormData({ ...formData, [name]: updated });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

const user = JSON.parse(localStorage.getItem("user"));

const handleSubmitOnboarding = async () => {
  const payload = {
    fitnessGoal: formData.fitnessGoal,
    focusArea: formData.focusArea,
    profileMetrics: {
      height: formData.height,
      weight: formData.weight
    },
    healthIssues: formData.healthIssues,
  };

  try {
    const res = await axios.put(
      `https://fitness-system-backend.vercel.app/api/auth/Updatedetails/${user._id}`,
      payload,
      { withCredentials: true }
    );

    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/user/dashboard");

  } catch (error) {
    console.log(error?.response?.data?.error);
  }
};



    return (
  <div className="w-full h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white rounded-2xl p-10 shadow-lg w-1/3">

    <h1 className="text-3xl font-bold text-center mb-1 flex justify-center items-center gap-1 p-0">Hey <GiHand className="text-[#e4a16b]"/>,Welcome to ElevFit</h1>
    <p className=" text-center text-gray-500 mb-6">
      Help us personalize your fitness journey — answer a few quick questions.
    </p>

    {/* STEP 1 - FITNESS GOAL */}
    {step === 1 && (
      <>
        <h2 className="text-xl font-semibold mb-6">What is your fitness goal?</h2>

        <div className="grid grid-cols-2 gap-3">
          {["Gain", "Lose", "Maintain", "Rehabilitation"].map((item) => (
            <button
              key={item}
              name="fitnessGoal"
              value={item.toLowerCase()}
              className={`py-3 rounded-lg border
                ${formData.fitnessGoal === item.toLowerCase()
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
                }`}
              onClick={(e) => handleChange(e)}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          disabled={!formData.fitnessGoal}
          className={`mt-6 w-full py-3 rounded-lg font-semibold
            ${formData.fitnessGoal ? "bg-green-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
          onClick={() => setStep(2)}
        >
          Next
        </button>
      </>
    )}

    {/* STEP 2 - FOCUS AREA */}
    {step === 2 && (
        <>
         <h2 className="text-xl font-semibold mb-6">Which area do you want to focus on?</h2>
         <div className="grid grid-cols-2 gap-3">
         {["Abs","Chest","Lower Body","Upper Body","Arms","Shoulders"].map((item)=>(
            <button key={item} name="focusArea" value={item.toLowerCase()} className={`py-3 rounded-lg border ${formData.focusArea.includes(item.toLowerCase()) 
                ? "bg-green-600 text-white"
                  : "bg-gray-200"}`} onClick={handleChange}  >
                {item}
            </button>
         ))}
         </div>
         <div className="flex justify-between mt-6">
            <button className="w-1/3 py-3 bg-gray-400 text-white rounded-lg" onClick={()=>setStep(1)}>
            Back
            </button>
            <button disabled={formData.focusArea.length == 0} className={`w-1/3 py-3 bg-gray-400 text-white rounded-lg
             ${!formData.focusArea.length == 0 ? "bg-green-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
              onClick={()=>setStep(3)} >
                Next
            </button>
         </div>
        </>
    )}

    {/* STEP 3 - HEIGHT / WEIGHT */}
    {step === 3 && (
      <>
        <h2 className="text-xl font-semibold mb-6">Your body metrics</h2>

        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          className="w-full p-3 rounded-lg border mb-4"
          onChange={handleChange}
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          className="w-full p-3 rounded-lg border"
          onChange={handleChange}
        />

        <div className="flex justify-between mt-6">
          <button className="w-1/3 py-3 bg-gray-400 text-white rounded-lg"
            onClick={() => setStep(2)}>
            Back
          </button>

          <button
            disabled={!formData.height || !formData.weight}
            className={`w-1/3 py-3 rounded-lg font-semibold
              ${formData.height && formData.weight
                ? "bg-green-700 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
            onClick={() => setStep(4)}
          >
            Next
          </button>
        </div>
      </>
    )}

    {/* STEP 4 - HEALTH ISSUES */}
    {step === 4 && (
      <>
        <h2 className="text-xl font-semibold mb-6">Do you have any health issues?</h2>

        <textarea
          name="healthIssues"
          placeholder="Example: Back pain, Knee injury..."
          className="w-full p-3 rounded-lg border h-24"
          onChange={handleChange}
        />

        <div className="flex justify-between mt-6">
          <button className="w-1/3 py-3 bg-gray-400 text-white rounded-lg"
            onClick={() => setStep(3)}>
            Back
          </button>

          <button
            className="w-1/3 py-3 bg-green-700 text-white rounded-lg font-semibold"
            onClick={handleSubmitOnboarding}
          >
            Finish
          </button>
        </div>
      </>
    )}

  </div>
</div>

);

}

export default UserOnboarding;
