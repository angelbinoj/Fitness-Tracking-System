

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHand } from "react-icons/gi";


function TrainerOnboarding(){

    const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
  trainerInfo: {
    specialization: "",
    experience: "",
    certifications: [{file:"", description:"" }],
    availability: ""
  }
});
const navigate = useNavigate();

const handleChange = (e, index, type) => {
  const { value, files, name } = e.target;

  // File input
  if (type === "file") {
    const updated = [...formData.trainerInfo.certifications];
    updated[index].file = files[0]; // store actual file object
    setFormData({
      ...formData,
      trainerInfo: {
        ...formData.trainerInfo,
        certifications: updated,
      },
    });
    return;
  }

  // Description input
  if (type === "description") {
    const updated = [...formData.trainerInfo.certifications];
    updated[index].description = value;
    setFormData({
      ...formData,
      trainerInfo: {
        ...formData.trainerInfo,
        certifications: updated,
      },
    });
    return;
  }

  // For normal fields like specialization, experience, availability
  setFormData({
    ...formData,
    trainerInfo: {
      ...formData.trainerInfo,
      [name]: value,
    },
  });
};




const addCertification = () => {
  setFormData({
    ...formData,
    trainerInfo: {
      ...formData.trainerInfo,
      certifications: [
        ...formData.trainerInfo.certifications,
        { file: "", description: "" }
      ]
    }
  });
};


const user = JSON.parse(localStorage.getItem("user"));

const handleSubmitOnboarding = async () => {
  const form = new FormData();

  form.append("trainerInfo[specialization]", formData.trainerInfo.specialization);
  form.append("trainerInfo[experience]", formData.trainerInfo.experience);
  form.append("trainerInfo[availability]", formData.trainerInfo.availability);

  formData.trainerInfo.certifications.forEach((cert, index) => {
    form.append("certifications", cert.file); 
    form.append(`description_${index}`, cert.description);
  });

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/auth/Updatedetails/${user._id}`,
      form,
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
    );

    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/trainer/dashboard");
  } catch (error) {
    console.log(error?.response?.data?.error);
  }
};

    return (
  <div className="w-full h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white rounded-2xl p-10 shadow-lg w-1/3">

    <h1 className="text-3xl font-bold text-center mb-1 flex justify-center items-center gap-1 p-0">Hey <GiHand className="text-[#e4a16b]"/>,Welcome to ElevFit</h1>
    <p className=" text-center text-gray-500 mb-6">
      Help us complete your trainer profile — answer a few quick questions.
    </p>

    {/* STEP 1 - Specialization */}
    {step === 1 && (
      <>
        <h2 className="text-xl font-semibold mb-6">Your specialization?</h2>

        <div className="grid grid-cols-2 gap-3">
          {["Strength", "Yoga", "Zumba", "Crossfit", "Cardio", "Physio"].map((item) => (
            <button
              key={item}
              name="specialization"
              value={item.toLowerCase()}
              className={`py-3 rounded-lg border
                ${formData.trainerInfo.specialization === item.toLowerCase()
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
          disabled={!formData.trainerInfo.specialization}
          className={`mt-6 w-full py-3 rounded-lg font-semibold
            ${formData.trainerInfo.specialization ? "bg-green-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
          onClick={() => setStep(2)}
        >
          Next
        </button>
      </>
    )}

    {/* STEP 2 - Experience */}
    {step === 2 && (
        <>
        <h2 className="text-xl font-semibold mb-6">Experience (Years)</h2>

        <div className="flex flex-col gap-2">
          {["0-1 years", "1-3 years", "3-5 years", "5+ years"].map((item) => (
            <button
              key={item}
              name="experience"
              value={item.toLowerCase()}
              className={`py-3 rounded-lg border
                ${formData.trainerInfo.experience === item.toLowerCase()
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
                }`}
              onClick={(e) => handleChange(e)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button className="w-1/3 py-3 bg-gray-400 text-white rounded-lg"
            onClick={() => setStep(1)}>
            Back
          </button>

          <button
          disabled={!formData.trainerInfo.experience}
          className={`w-1/3 py-3 bg-gray-400 text-white rounded-lg
            ${formData.trainerInfo.experience ? "bg-green-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
          onClick={() => setStep(3)}
        >
          Next
        </button>
        </div>
      </>
    )}

    {/* STEP 3 - Certifications */}
    {step === 3 && (
  <>
    <h2 className="text-xl font-semibold mb-6">Add Your Certifications</h2>

    {formData.trainerInfo.certifications.map((cert, index) => (
      <div key={index} className="border p-4 rounded-lg mb-4">
        
        <input
      type="text"
      placeholder="Certification Title / Description"
      value={cert.description}
      className="w-full p-3 rounded-lg border mb-3"
      onChange={(e) => handleChange(e, index, "description")}
    />

    <input
      type="file"
      className="w-full p-3 rounded-lg border"
      onChange={(e) => handleChange(e, index, "file")}
    />
      </div>
    ))}

    <button
      className="w-full py-2 bg-gray-300 rounded-lg font-semibold mt-2"
      onClick={addCertification}
    >
      + Add Another Certification
    </button>

    <div className="flex justify-between mt-6">
      <button
        className="w-1/3 py-3 bg-gray-400 text-white rounded-lg"
        onClick={() => setStep(2)}
      >
        Back
      </button>

      <button
        className="w-1/3 py-3 bg-green-700 text-white rounded-lg font-semibold"
        onClick={() => setStep(4)}
      >
        Next
      </button>
    </div>
  </>
)}


    {/* STEP 4 - Availability */}
    {step === 4 && (
      <>
        <h2 className="text-xl font-semibold mb-6">When are you available to train?</h2>

        <div className="flex flex-col gap-2">
          {["Weekdays - Morning", "Weekdays - Evening", "Weekends - Morning", "Weekends - Evening", "All Days - Flexible"]
          .map((item) => (
            <button
              key={item}
              name="availability"
              value={item.toLowerCase()}
              className={`py-3 rounded-lg border
                ${formData.trainerInfo.availability === item.toLowerCase()
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
                }`}
              onClick={(e) => handleChange(e)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-6">
      <button
        className="w-1/3 py-3 bg-gray-400 text-white rounded-lg"
        onClick={() => setStep(3)}
      >
        Back
      </button>
        <button
          disabled={!formData.trainerInfo.availability}
          className={`w-1/3 py-3 bg-gray-400 text-white rounded-lg
            ${formData.trainerInfo.availability ? "bg-green-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
          onClick={handleSubmitOnboarding}
        >
          FINISH
        </button>
    </div>
      </>
    )}

  </div>
</div>

);

}

export default TrainerOnboarding;
