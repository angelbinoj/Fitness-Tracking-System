import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

export default function Navbar() {
  return (
    <div className='w-full z-50 fixed top-0 '>
    <nav className="p-2 md:p-4 flex justify-between bg-gradient-to-br from-[#0f5707] to-[#159307] ">
      <div className='w-full grid grid-cols-2 md:grid-cols-[40%_60%]  lg:grid-cols-[45%_55%] '>
        <div className='text-center flex justify-center'>
          <h1 className='logo'>ElevFit</h1>
        </div>
        <div className='flex justify-around items-center text-center ps-10 text-base lg:text-lg'>
        <a href="#home" className="hidden md:block cursor-pointer font-medium text-[#f7ffcd] hover:[text-shadow:0_0_3px_rgba(240,255,168,0.8)]">Home</a>
        <a href="#about" className="hidden md:block cursor-pointer font-medium  text-[#f7ffcd] hover:[text-shadow:0_0_3px_rgba(240,255,168,0.8)]">About</a>
        <a href="#service" className="hidden md:block cursor-pointer font-medium text-[#f7ffcd] hover:[text-shadow:0_0_3px_rgba(240,255,168,0.8)]">Services</a>
        <a href="#trainers" className="hidden md:block cursor-pointer font-medium text-[#f7ffcd] hover:[text-shadow:0_0_3px_rgba(240,255,168,0.8)]">Trainers</a>
        <Link to="/login"><button className='bg-[#ecff41] hover:bg-[#f4ff8f] hover:shadow-lg text-slate-900 flex justify-center items-center text-sm lg:text-base px-2 md:px-4 py-1 uppercase rounded-3xl'>Login</button></Link>
        <Link to="/signup"><button className='bg-[#ecff41] hover:bg-[#f4ff8f] hover:shadow-lg text-slate-900 flex justify-center items-center text-sm lg:text-base px-2 md:px-4 py-1 uppercase rounded-3xl'>SignUp</button></Link>
        </div>
      </div>
    </nav>
    <div className='flex flex-row justify-around items-center gap-4 md:hidden w-full bg-gradient-to-br from-[#c7ff45] to-[#e1f719] shadow-sm shadow-[#ecff45] h-9 '>
        <a href="#home" className="block cursor-pointer uppercase font-bold text-[#424242] hover:text-[#242323]">Home</a>
        <a href="#about" className=" block cursor-pointer uppercase font-bold  text-[#424242] hover:text-[#242323]">About</a>
        <a href="#service" className=" block cursor-pointer uppercase font-bold text-[#424242] hover:text-[#242323]">Services</a>
        <a href="#trainers" className=" block cursor-pointer uppercase font-bold text-[#424242] hover:text-[#242323]">Trainers</a>
    </div>
    </div>
  );
}
