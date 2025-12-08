import { Link } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import '../../App.css';

export default function UserSidebar(){

    const navLink = [
        {
            url: "/user/updateProfile",
            text: "Profile"
        },
        {
            url: "/trainer",
            text: "Trainer Info"
        },
    {
        url: "/user/workoutPlan",
        text: "Workout Plan"
    },
    {
        url: "/user/nutritionPlan",
        text: "Nutrition Plan"
    },
    {
        url: "/user/logs",
        text: "View Logs"
    },
    {
        url: "/",
        text: "Sessions"
    },
   {
        url: "/user/viewPayments",
        text: "Payments"
    },
    {
        url: "/",
        text: "Chats"
    }
]

    return(
        <div className="w-full h-screen bg-[#0f5707] grid grid-rows-[20%_70%_10%]">
           <div className='flex justify-center items-center'>
          <h1 className='logo'>ElevFit</h1>
        </div>
        <div className='flex flex-col gap-3 uppercase'>
            <span className='w-full py-3 bg-[#ddf600] text-slate-900 font-semibold  text-lg text-center'>dashboard</span>
            {navLink.map((item)=>(
                <Link key={item.text} className='font-semibold border-b border-green-700 text-[#dff51c] hover:font-bold text-center' to={item.url}>
                            {item.text}
                        </Link>
            ))}
        </div>
        <div>
            <Link to='/logout' className='font-semibold border-t text-xl border-green-700 text-[#dff51c] hover:font-bold flex justify-center items-center gap-3 pt-3'>Logout<FiLogOut /></Link>
        </div>
        </div>
    )
}