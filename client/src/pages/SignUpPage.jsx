// import axios from 'axios';
// import { useState } from "react";
// import { MdHome } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import avatar from '../assets/avatar.png';




// function SignUpPage(){

// const [userData, setUserData] = useState({name:"", email:"", contact:"", age:"", gender:"", profilePic:"", role: "", password:"", confirmPassword:""});
// const [alertMessage,setAlertMessage]= useState("");
// const [showAlert, setShowAlert]=useState(false);
// const [alertColor, setAlertColor]=useState("");
// const navigate = useNavigate()

//     const handleChange=async(e)=>{
//         setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//     }

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Basic validation
//   if (!userData.name || !userData.email || !userData.contact || !userData.age || !userData.role || !userData.gender|| !userData.password || !userData.confirmPassword) {
//     setAlertMessage("All fields are required!");
//     setAlertColor("text-red-600");
//     setShowAlert(true);
//     return;
//   }

//   // Email format check
//   const emailRegex = /^\S+@\S+\.\S+$/;
//   if (!emailRegex.test(userData.email)) {
//     setAlertMessage("Invalid email format!");
//     setAlertColor("text-red-600");
//     setShowAlert(true);
//     return;
//   }

//   // Phone number check
//   if (!/^[0-9]{10}$/.test(userData.contact)) {
//     setAlertMessage("Phone number must be 10 digits!");
//     setAlertColor("text-red-600");
//     setShowAlert(true);
//     return;
//   }

//   // Password length check
//   if (userData.password.length < 6) {
//     setAlertMessage("Password must be at least 6 characters!");
//     setAlertColor("text-red-600");
//     setShowAlert(true);
//     return;
//   }

//   // Confirm password match
//   if (userData.password !== userData.confirmPassword) {
//     setAlertMessage("Passwords do not match!");
//     setAlertColor("text-red-600");
//     setShowAlert(true);
//     return;
//   }

//   try {
//     const { data } = await axios.post(
//       "https://fitness-system-backend.vercel.app/api/auth/register",
//       userData,
//       { withCredentials: true }
//     );
//     console.log(userData);
    
//     if (data?.message) {
//       setAlertMessage(data.message);
//       setAlertColor("text-green-700");
//       setShowAlert(true);

//       setTimeout(() => navigate("/login"), 1000);
//     }
//   } catch (error) {
//     console.log(error); 
//     setAlertMessage(error?.response?.data?.error);
//     setAlertColor("text-red-600");
//     setShowAlert(true);
//   }
// };



//     return(
//         <>
//        <div className="mt-2 ms-10 ">
//   <Link to='/'>
//     <button className="uppercase bg-[#156f0b] hover:bg-[#1b9c0d] text-white font-semibold rounded-full px-6 py-2 flex justify-between items-center gap-2">
//       <MdHome style={{ width: '30px', height: '30px' }} /> back to home
//     </button>
//   </Link>
// </div>

// <div className='flex flex-col mx-auto mb-2 items-center bg-[#d9d8d8] border border-[#9aac00] rounded-md font-medium w-2/5 px-6 pb-10'>
//   <h1 className='text-2xl mt-10 font-bold text-slate-950 capitalize'>let’s start your journey</h1>
//   <p className="capitalize my-4 text-slate-800">
//     already have an account?
//     <Link to="/login">
//       <span className='text-[#8d9b0c] hover:text-[#adbe0e] font-semibold hover:font-bold text-lg'> Sign In</span>
//     </Link>
//   </p>
//   <div className="flex flex-col items-center mt-2">
//     <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
//       {userData.profilePic ? (
//         <img src={URL.createObjectURL(userData.profilePic)} alt="preview" className="w-full h-full object-cover" />
//       ) : (
//         <img src={avatar} className="w-50 h-50 rounded-full object-contain"/>
//       )}
//     </div>

//     <label className="mt-2 text-sm font-semibold cursor-pointer bg-[#8d9b0c] px-3 py-1 rounded-md text-white">
//       Upload
//       <input
//         type="file"
//         name="profilePic"
//         accept="image/*"
//         className="hidden"
//         onChange={(e) => setUserData({ ...userData, profilePic: e.target.files[0] })}
//       />
//     </label>
//   </div>

//   <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-10/12 mt-4'>
//     <input className='h-10 w-2/3 ps-4 rounded-md' type="text" name="name" placeholder='Full Name' onChange={handleChange} required />
//     <div className="flex gap-3 w-full">

//     <input className='h-10 ps-4 rounded-md' type="email" name="email" placeholder='Email' onChange={handleChange} required />
//     <input className='h-10 ps-4 rounded-md' type="phone" name="contact" placeholder='Phone' onChange={handleChange} required />
//     </div>

//     <div className='flex gap-3 w-full'>
//       <input className='h-10 ps-4 w-1/3 rounded-md' type="number" name="age" placeholder='Age' onChange={handleChange} required />
//       <select className='h-10 ps-4 w-1/2 rounded-md' name="gender" onChange={handleChange} required>
//         <option value="">Gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>
//     </div>


// <div className="flex gap-3 w-full justify-between">

//     <input className='h-10 ps-4 rounded-md' type="password" name="password" placeholder='Password' onChange={handleChange} required />
//     <input className='h-10 ps-4 rounded-md' type="password" name="confirmPassword" placeholder='Confirm Password' onChange={handleChange} required />
// </div>
//     <div className="flex flex-col mt-1 w-full">
//   <p className="text-sm font-semibold text-slate-900 mb-1">How would you like to use this app?</p>

//   <div className="flex gap-4">
//     <label className="flex items-center gap-2 cursor-pointer">
//       <input type="radio" name="role"value="client" className="accent-[#78B424] w-4 h-4" checked={userData.role=="client"} onChange={handleChange}/>
//       <span className="text-slate-800 ">Client</span>
//     </label>

//     <label className="flex items-center gap-1">
//       <input type="radio" name="role" value="trainer" className="accent-[#78B424] w-4 h-4" checked={userData.role=="trainer"} onChange={handleChange} />
//      <span className="text-slate-800">Trainer</span>
//     </label>
//   </div>
// </div>

//     <div className={`mt-1 text-lg font-bold ${alertColor}`}>{alertMessage}</div>

//     <div className='mt-3 flex gap-5 justify-center'>
//       <button type='reset' className='text-slate-100 px-10 py-2 rounded-md bg-slate-800 hover:bg-slate-600'>Reset</button>
//       <button type='submit' className='text-slate-100 px-10 py-2 rounded-md bg-[#78B424] hover:bg-[#8edb21]'>Sign Up</button>
//     </div>
//   </form>
// </div>

//         </>
//     )
// }

// export default SignUpPage

import axios from 'axios';
import { useState } from "react";
import { MdHome } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import avatar from '../assets/avatar.png';

function SignUpPage() {
  const [userData, setUserData] = useState({name:"", email:"", contact:"", age:"", gender:"", profilePic:"", role:"client", password:"", confirmPassword:""});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleFileChange = (e) => {
    setUserData((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.contact || !userData.age || !userData.gender || !userData.role || !userData.password || !userData.confirmPassword) {
      setAlertMessage("All fields are required!");
      setAlertColor("text-red-600");
      setShowAlert(true);
      return;
    }

      // Email format check
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(userData.email)) {
    setAlertMessage("Invalid email format!");
    setAlertColor("text-red-600");
    setShowAlert(true);
    return;
  }

  // Phone number check
  if (!/^[0-9]{10}$/.test(userData.contact)) {
    setAlertMessage("Phone number must be 10 digits!");
    setAlertColor("text-red-600");
    setShowAlert(true);
    return;
  }

  // Password length check
  if (userData.password.length < 6) {
    setAlertMessage("Password must be at least 6 characters!");
    setAlertColor("text-red-600");
    setShowAlert(true);
    return;
  }

    if (userData.password !== userData.confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setAlertColor("text-red-600");
      setShowAlert(true);
      return;
    }

    try {
      const form = new FormData();
      form.append("name", userData.name);
      form.append("email", userData.email);
      form.append("contact", userData.contact);
      form.append("age", userData.age);
      form.append("gender", userData.gender);
      form.append("role", userData.role);
      form.append("password", userData.password);
      form.append("confirmPassword", userData.confirmPassword);
      if (userData.profilePic) form.append("profilePic", userData.profilePic);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        form,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(data);
      

      if (data?.message) {
      setAlertMessage(data.message);
      setAlertColor("text-green-700");
      setShowAlert(true);

      setTimeout(() => navigate("/login"), 1000);
    }
    } catch (error) {
      setAlertMessage(error?.response?.data?.error || "Registration failed");
      setAlertColor("text-red-600");
      setShowAlert(true);
    }
  }

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center pb-4">
      
      {/* Back to Home */}
      <div className="mt-4 w-full max-w-lg">
        <Link to='/'>
          <button className="uppercase bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full px-6 py-2 flex items-center gap-2">
            <MdHome className="w-6 h-6" /> Back to Home
          </button>
        </Link>
      </div>

      {/* Signup Form */}
      <div className="flex flex-col mx-auto mt-8 items-center bg-white border border-green-400 rounded-lg shadow-md w-full max-w-xl p-8">
        <h1 className="text-2xl font-bold text-green-900 text-center mb-4">Let’s Start Your Journey</h1>
        <p className="text-center text-green-800 mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">Sign In</Link>
        </p>

        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {userData.profilePic ? (
              <img src={URL.createObjectURL(userData.profilePic)} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <img src={avatar} alt="avatar" className="w-full h-full object-contain" />
            )}
          </div>
        </div>

        <label className="block text-center mb-4 text-sm font-medium  cursor-pointer bg-green-600 hover:bg-green-700 px-4 py-1 rounded-md text-white">
          Upload Profile Picture
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
          
          <div className="flex gap-2">
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="flex-1 p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
            <input type="text" name="contact" placeholder="Phone" onChange={handleChange} className="flex-1 p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>

          <div className="flex gap-2">
            <input type="number" name="age" placeholder="Age" onChange={handleChange} className="flex-1 p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
            <select name="gender" onChange={handleChange} className="flex-1 p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="client" checked={userData.role === "client"} onChange={handleChange} className="accent-green-600 w-4 h-4" />
              <span className="text-green-900">Client</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="trainer" checked={userData.role === "trainer"} onChange={handleChange} className="accent-green-600 w-4 h-4" />
              <span className="text-green-900">Trainer</span>
            </label>
          </div>

          <div className="flex gap-2">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="flex-1 p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="flex-1 p-3 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>

          
        {showAlert && (
          <div className={`text-center font-semibold my-3 ${alertColor}`}>
            {alertMessage}
          </div>
        )}

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
