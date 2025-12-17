import axios from "axios";
import { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";

function UserUpdateProfile() {
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
          "https://fitness-system-backend.vercel.app/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setUserData(data.profile);
        if (data.profile.profilePic) setPreview(data.profile.profilePic);
      } catch (error) {
        setAlertMessage("Failed to fetch profile.");
        setAlertColor("text-red-600");
        setShowAlert(true);
      }
    };
    fetchProfile();
  }, [token]);

  const [isEditable, setIsEditable] = useState(false);
  const enableEdit = () => setIsEditable(!isEditable);

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
      if (!isEditable) {
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
          "https://fitness-system-backend.vercel.app/api/user/profile",
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
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1000);
      }
    } catch (error) {
      setAlertMessage(error?.response?.data?.error || "Update failed!");
      setAlertColor("text-red-600");
      setShowAlert(true);
    }
  };

  return (
    <div className="flex justify-center items-center py-4 px-4  min-h-screen">
      <div className="flex flex-col mx-auto items-center bg-white dark:bg-green-50 shadow-lg border border-green-300 rounded-lg font-medium w-full sm:w-4/5 md:w-3/5 lg:w-1/2 p-8">

        <h1 className="text-3xl my-6 font-bold text-green-800 uppercase text-center">
          {!isEditable ? "Profile" : "Update Profile"}
        </h1>

        <div className="flex flex-col items-center mt-2">
          <div className="w-32 h-32 bg-gray-200 border-green-300 border-2 rounded-full overflow-hidden shadow-sm">
            {preview ? (
              <img src={preview} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            )}
          </div>

          {isEditable && (
            <label className="mt-3 text-sm font-semibold cursor-pointer bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-700 transition">
              Update Photo
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full mt-6">
          <label className="font-semibold text-lg uppercase flex flex-col">
            Full Name:
            <input
              className={`h-10 mt-1 w-full text-base rounded-md ps-4 capitalize bg-gray-100 ${isEditable ? "border-2 border-green-600" : "border border-transparent"
                }`}
              type="text"
              name="name"
              value={userData.name}
              readOnly={!isEditable}
              onChange={handleChange}
            />
          </label>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <label className="font-semibold text-lg uppercase flex flex-col w-full">
              Email:
              <input
                className={`h-10 mt-1 text-base rounded-md ps-4 bg-gray-100 ${isEditable ? "border-2 border-green-600" : "border border-transparent"
                  }`}
                type="email"
                name="email"
                value={userData.email}
                readOnly={!isEditable}
                onChange={handleChange}
              />
            </label>

            <label className="font-semibold text-lg uppercase flex flex-col w-full">
              Contact:
              <input
                className={`h-10 mt-1 text-base rounded-md ps-4 bg-gray-100 ${isEditable ? "border-2 border-green-600" : "border border-transparent"
                  }`}
                type="text"
                name="contact"
                value={userData.contact}
                readOnly={!isEditable}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <label className="font-semibold text-lg uppercase flex flex-col w-full">
              Age:
              <input
                className={`h-10 mt-1 text-base rounded-md ps-4 bg-gray-100 ${isEditable ? "border-2 border-green-600" : "border border-transparent"
                  }`}
                type="number"
                name="age"
                value={userData.age}
                readOnly={!isEditable}
                onChange={handleChange}
              />
            </label>

            <label className="font-semibold text-lg uppercase flex flex-col w-full">
              Gender:
              <select
                className={`h-10 mt-1 text-base rounded-md ps-4 bg-gray-100 ${isEditable ? "border-2 border-green-600" : "border border-transparent"
                  }`}
                name="gender"
                value={userData.gender}
                disabled={!isEditable}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>

          {showAlert && (
            <div className={`text-center text-lg font-bold ${alertColor}`}>
              {alertMessage}
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <button
              onClick={enableEdit}
              className={`text-white uppercase text-lg py-2 px-5 rounded-md transition shadow ${!isEditable
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-green-700 hover:bg-green-800"
                }`}
            >
              {!isEditable ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserUpdateProfile;
