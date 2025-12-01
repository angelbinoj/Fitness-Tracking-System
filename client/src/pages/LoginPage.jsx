import axios from 'axios';
import { useState } from "react";
import { MdHome } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


function LoginPage(){

const [userData, setUserData] = useState({email:"", password:""});
const [alertMessage,setAlertMessage]= useState("");
const [showAlert, setShowAlert]=useState(false);
const [alertColor, setAlertColor]=useState("");
const navigate = useNavigate()

    const handleChange=async(e)=>{
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!userData.email || !userData.password ) {
    setAlertMessage("All fields are required!");
    setAlertColor("text-red-600");
    setShowAlert(true);
    return;
  }

  try {
    const { data } = await axios.post(
      "https://fitness-system-backend.vercel.app/auth/login",
      userData,
      { withCredentials: true }
    );
    console.log(data.message);
    console.log(data);
    

    
    if (data?.message) {
      localStorage.setItem('token', (data.token));
      localStorage.setItem("role", data.User.role);
      localStorage.setItem("user",JSON.stringify(data.User));
      setAlertMessage(data.message);
      setAlertColor("text-green-700");
      setShowAlert(true);

      setTimeout(() => {
        if (data.User.role === "client") navigate("/user/dashboard");
    if (data.User.role === "trainer") navigate("/trainer/dashboard");
    if (data.User.role === "admin") navigate("/admin/dashboard");
      }
, 1000);
    }
  } catch (error) {
    console.log(error); 
    setAlertMessage(error?.response?.data?.error);
    setAlertColor("text-red-600");
    setShowAlert(true);
  }
};



    return(
        <>
        <div className="mt-10 ms-10 ">
            <Link to='/'><button className="uppercase bg-[#156f0b] hover:bg-[#1b9c0d] text-white font-semibold rounded-full px-6 py-2 flex justify-between items-center gap-2"><MdHome style={{width:'30px', height:'30px'}}/>back to home </button></Link>
        </div>
        <div className='flex flex-col mx-auto mt-10 items-center bg-[#d9d8d8] border border-[#9aac00] rounded-md font-medium w-96 px-6 pb-10'>
            <h1 className=' text-2xl mt-10 font-bold text-slate-950 capitalize'>Sign in to ElevFit</h1>
            <p className="capitalize my-4 text-slate-800">New User?<Link to="/signup"><span className='text-[#8d9b0c] hover:text-[#adbe0e] font-semibold hover:font-bold text-lg'> Sign Up</span></Link></p>
            <form onSubmit={handleSubmit} className=' flex flex-col mt-4 w-10/12' >

                <input className='h-10 ps-4 mb-5 rounded-md' type="email" name="email" placeholder='Email' onChange={handleChange} autoComplete='off' required />
                <input className='h-10 ps-4  rounded-md' type="password" name="password" placeholder='Password' onChange={handleChange} autoComplete='off' required />
                <div className={`mt-1 text-base font-bold ${alertColor}`}>
                 {alertMessage}</div>
                 <div className="text-end my-2 text-stone-900 hover:text-stone-700 hover:underline cursor-pointer">Forgot Password?</div>
                <div className=' mt-5 flex gap-3 justify-around'>
                <button type='reset' className=' text-slate-100 px-10 py-2 rounded-md bg-slate-800 hover:bg-slate-600'>Reset</button>
                <button type='submit' className='text-slate-100 px-10 py-2 rounded-md bg-[#78B424] hover:bg-[#8edb21]'>Login</button>
                </div>

            </form>
        </div>
        </>
    )
}

export default LoginPage