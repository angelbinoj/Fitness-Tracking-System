import { Link } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import '../../App.css';

export default function AdminSidebar(){

    const navLink = [
        {
            url: "/admin/updateProfile",
            text: "Update Profile"
        },
        {
            url: "/clientList",
            text: "View Clients"
        },
        {
            url: "/trainerList",
            text: "View Trainers"
        },
    {
        url: "/",
        text: "Sessions"
    },
    {
        url: "/admin/viewAllPayments",
        text: "Payments"
    },
    {
        url: "/",
        text: "Reports"
    }
]

    return(
        <div className="w-full h-screen bg-[#0f5707] grid grid-rows-[20%_70%_10%] border">
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
            <Link to='/logout' className='text-xl pt-4 border-t-2 border-green-700 font-semibold flex justify-center items-center gap-1 text-[#dff51c] hover:font-bold  '>Logout<FiLogOut /></Link>
        </div>
        </div>
    )
}