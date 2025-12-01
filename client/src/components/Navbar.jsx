import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

export default function Navbar() {
  return (
    <nav className="p-4 flex justify-between bg-[#0f5707]">
      <div className='w-full grid grid-cols-[45%_55%] '>
        <div className='text-center flex justify-center'>
          <h1 className='logo'>ElevFit</h1>
        </div>
        <div className='flex justify-around items-center text-center ps-10 text-lg'>
        <a href="#home" className="cursor-pointer font-medium text-[#f7ffcd] hover:[text-shadow:0_0_3px_rgba(240,255,168,0.8)]">Home</a>
        <a href="#about" className="cursor-pointer font-medium  text-[#f7ffcd] hover:[text-shadow:0_0_3px_rgba(240,255,168,0.8)]">About</a>
        <a href="#service" className="cursor-pointer font-medium text-[#f7ffcd] hover:[text-shadow:0_0_3px_rgba(240,255,168,0.8)]">Services</a>
        <a href="#trainers" className="cursor-pointer font-medium text-[#f7ffcd] hover:[text-shadow:0_0_3px_rgba(240,255,168,0.8)]">Trainers</a>
        <Link to="/login"><button className='bg-[#ecff41] hover:bg-[#f4ff8f] hover:shadow-lg text-slate-900 flex justify-center items-center text-base px-4 py-1 uppercase rounded-3xl'>Login</button></Link>
        <Link to="/signup"><button className='bg-[#ecff41] hover:bg-[#f4ff8f] hover:shadow-lg text-slate-900 flex justify-center items-center text-base px-4 py-1 uppercase rounded-3xl'>SignUp</button></Link>
        </div>
      </div>
    </nav>
  );
}
