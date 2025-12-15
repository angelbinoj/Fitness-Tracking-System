import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import '../../App.css';

export default function UserSidebar(){

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);


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
        url: "/user/sessions",
        text: "Sessions"
    },
   {
        url: "/user/viewPayments",
        text: "Payments"
    },
    {
        url: "/user/chat",
        text: "Chats"
    }
]

    return(
       <>
                   <div 
                       className="md:hidden fixed left-0 top-0 h-screen bg-[#0f5707] flex items-center justify-center cursor-pointer z-50"
                       onClick={() => setOpen(!open)}
                   >
                       <div className={`text-[#dff51c] rotate-90 ${open ? "hidden" : "block w-[22px]"} text-xl`}><GiHamburgerMenu /></div>
                   </div>
       
                   <div className={`
                       fixed top-0 left-0 bg-[#0f5707] h-screen grid grid-rows-[20%_70%_10%]
                       transition-transform duration-300
                       md:w-[20%]
                       md:translate-x-0
                       ${open ? "translate-x-0" : "-translate-x-full"}
                       z-40
                   `}>
                       <div className='flex justify-center items-center px-2'>
                           <div 
                       className="md:hidden fixed right-4 top-4 bg-[#0f5707] flex items-center justify-center cursor-pointer z-50"
                       onClick={() => setOpen(!open)}
                   >
                       <div className={`text-[#dff51c] ${open ? "block w-[20px]" : "hidden"} font-bold text-2xl hover:font-extrabold`}><RxCross2 /></div>
                   </div>
                           <h1 className='logo'>ElevFit</h1>
                       </div>
       
                       <div className='flex flex-col gap-3 uppercase'>
                           <span 
                               onClick={() => { navigate("/client/dashboard"); setOpen(false); }}
                               className='w-full py-3 bg-[#ddf600] hover:bg-[#ebff3a] text-slate-900 font-semibold hover:font-bold text-lg text-center'
                           >
                               dashboard
                           </span>
       
                           {navLink.map(item => (
                               <Link 
                                   key={item.text}
                                   className='font-semibold border-b border-green-700 text-[#dff51c] hover:font-bold text-center'
                                   to={item.url}
                                   onClick={() => setOpen(false)}
                               >
                                   {item.text}
                               </Link>
                           ))}
                       </div>
       
                       <div>
                           <Link 
                               to='/logout'
                               className='text-xl pt-4 border-t-2 border-green-700 font-semibold flex justify-center items-center gap-1 text-[#dff51c] hover:font-bold'
                               onClick={() => setOpen(false)}
                           >
                               Logout <FiLogOut />
                           </Link>
                       </div>
                   </div>
               </>
    )
}