import axios from "axios";
import { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";

function AdminUpdateProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    profilePic: null,
  });
  
  const [preview, setPreview] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://fitness-system-backend.vercel.app/api/admin/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setUserData(data.profile);
        console.log(data.profile);
        
        if (data.profile.profilePic) setPreview(data.profile.profilePic);
      } catch (error) {
        console.log(error);
        setAlertMessage("Failed to fetch profile.");
        setAlertColor("text-red-600");
        setShowAlert(true);
      }
    };
    fetchProfile();
  }, [token]);
  
const [isEditable, setIsEditable] = useState(false);
const enableEdit = () => {
   setIsEditable(!isEditable);
};

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({ ...prev, profilePic: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!isEditable){
        const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("contact", userData.contact);
      formData.append("age", userData.age);
      formData.append("gender", userData.gender);
      if (userData.profilePic instanceof File) {
        formData.append("profilePic", userData.profilePic);
      }

      const { data } = await axios.put(
        "https://fitness-system-backend.vercel.app/api/admin/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      

      setAlertMessage(data.message || "Profile updated successfully!");
      setAlertColor("text-green-700");
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 1000);
      }

    } catch (error) {
      setAlertMessage(error?.response?.data?.error || "Update failed!");
      setAlertColor("text-red-600");
      setShowAlert(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col mx-auto mb-2 items-center bg-[#bfbbbb] border border-[#9aac00] rounded-md font-medium w-3/5 px-auto pb-10">
        <h1 className="text-3xl my-10 font-bold text-slate-950 uppercase">
          {!isEditable? 'Profile' : 'Update profile'}
        </h1>

        <div className="flex flex-col items-center mt-2 mx-10">
          <div className="w-32 h-32 bg-gray-300 border-slate-100 border-2 rounded-full overflow-hidden">
            {preview ? (
              <img src={preview} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            )}
          </div>
          {isEditable && (
            <label className="mt-2 text-sm font-semibold cursor-pointer bg-[#8d9b0c] px-3 py-1 rounded-md text-white">
            Update profile
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              className="hidden"
              disabled={!isEditable}
              onChange={handleFileChange}
            />
          </label>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-10/12 m-4">
        <label className="font-semibold text-lg uppercase">Full Name:
          <input
          className={`h-8 mx-3 w-2/4 text-base capitalize rounded-md ps-4 
  ${isEditable ? 'border-2 border-blue-500' : 'border border-transparent'}`}
            type="text"
            name="name"
            value={userData.name}
            placeholder="Full Name"
            readOnly={!isEditable}
            onChange={handleChange}
          />
          </label>

          <div className="flex gap-2 w-full">
          <label className="font-semibold text-lg uppercase">email:</label>
            <input
              className={`h-8 mx-2 text-base rounded-md ps-4 
  ${isEditable ? 'border-2 border-blue-500' : 'border border-transparent'}`}

              type="email"
              name="email"
              value={userData.email}
              readOnly={!isEditable}
              placeholder="Email"
              onChange={handleChange}
            />
            <label className="font-semibold text-lg uppercase">Contact:</label>
            <input
             className={`h-8 mx-2 text-base capitalize rounded-md ps-4 
  ${isEditable ? 'border-2 border-blue-500' : 'border border-transparent'}`}

              type="text"
              name="contact"
              value={userData.contact}
              readOnly={!isEditable}
              placeholder="Phone"
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 w-full">
            <label className="font-semibold text-lg uppercase">age:</label>
            <input
              className={`h-8 mx-2 text-base capitalize rounded-md ps-4 w-1/3
  ${isEditable ? 'border-2 border-blue-500' : 'border border-transparent'}`}

              type="number"
              name="age"
              readOnly={!isEditable}
              value={userData.age}
              placeholder="Age"
              onChange={handleChange}
            />
            <label className="font-semibold text-lg uppercase">gender:</label>
            <select
              className={`h-8 mx-2 text-base capitalize rounded-md ps-4 w-1/2
  ${isEditable ? 'border-2 border-blue-500' : 'border border-transparent'}`}
              name="gender"
              value={userData.gender}
              disabled={!isEditable}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {showAlert && (
            <div className={`mt-1 text-lg font-bold ${alertColor}`}>{alertMessage}</div>
          )}

          <div className="mt-3 flex gap-5 justify-center">
            <button onClick={enableEdit} 
            className={` text-white uppercase text-lg py-2 px-3 m-3 rounded-md 
            ${!isEditable ?'bg-[#c6ca02] hover:bg-[#dee203]' : "bg-[#1fa324] hover:bg-[#31bf21]"}`}>
              {!isEditable ? 'Update' : 'Save'}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdateProfile;
