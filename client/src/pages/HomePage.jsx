import React from 'react';
import { HiArrowLongRight } from "react-icons/hi2";
import service from '../assets/service.jpg';
import gymMen from '../assets/gymMen.png';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      {/* banner section */}
      <div class="mt-10 mx-16 bg-[#0f4d0f] bg-gradient-to-r from-[#0f4d0f] to-[#0b3a0b]
            px-14 pt-5  rounded-2xl flex flex-col md:flex-row items-center justify-between gap-10">
  <div class="md:w-1/2">
    <h1 class="text-[#f0ffa8] text-4xl md:text-5xl uppercase font-extrabold leading-tight">
      Elevate your <br />
      fitness journey
    </h1>

    <p class="text-white opacity-80 mt-4">
      With dedicated coaching, real-time progress tracking, and supportive guidance,
      we help you achieve the fitness goals you've always wanted.
    </p>

    <div class="mt-6 flex items-center gap-4">
      <button class="bg-[#e5ff00] text-black font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition">
        <Link to='/signup'><span class="flex justify-center text-xl items-center gap-1">Get Started <HiArrowLongRight /></span></Link>
      </button>
    </div>
  </div>
  <div class="relative md:w-1/2 flex justify-center items-center">
    <div class="absolute w-[380px] h-[380px] 
                bg-[#e5ff00] opacity-50 blur-[120px] rounded-full
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    <img src={gymMen}
         class="relative z-20 w-[260px] md:w-[320px] object-contain" />
  </div>
</div>

{/* about section */}
      <div id="about" className='my-16 mx-16 px-10 h-fit grid grid-cols-2'>
        <div className='uppercase flex flex-col ps-20 mt-6 items-start gap-7'>
          <span className='bg-[#d8f002] px-3 py-1 rounded-full font-bold'>about us</span>
          <h1 className="text-green-950 text-4xl md:text-5xl font-bold leading-tight">
            The <span className='text-[#D7EF00]'>power</span><br />
            behind your<br />
            vision
          </h1>
        </div>
        <div className='flex flex-col justify-center gap-4'>
          <div>
            <p className="text-gray-800 text-base leading-relaxed">
              ElevFit is dedicated to helping you achieve your fitness and wellness goals through
              expert coaching, personalized workout plans, and smart progress tracking.
              We support you every step of the way in building a healthier lifestyle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">        
          <div className="bg-[#c2e901] p-8 rounded-xl shadow">
            <h3 className="text-green-900 font-bold text-xl">OUR VISION</h3>
            <p className="text-green-900 mt-3 leading-relaxed">
              To inspire individuals to lead healthier, stronger, and more fulfilling lives
              through fitness, discipline, and wellness.
            </p>
          </div>        
          <div className="bg-white p-8 rounded-xl shadow border">
            <h3 className="text-green-900 font-bold text-xl">OUR MISSION</h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              To empower individuals with tailored fitness solutions that build confidence,
              strength, and healthy habits that last a lifetime.
            </p>
          </div>
        </div>
        </div>      
      </div>

{/* service section */}

<div id='service' class="mt-16 px-3 flex justify-center">
  <div class="w-full max-w-6xl relative rounded-3xl overflow-hidden">
    
    <img src={service}
         class="w-full h-[500px] object-cover object-top" />

    <div class="absolute inset-0 bg-black/30"></div>

    <div class="absolute top-5 left-10 text-white">
      <h2 class="text-3xl md:text-4xl font-bold">WHAT WE OFFER</h2>
      <p class="text-sm md:text-base mt-1 opacity-80">
        Personalized coaching to help you reach your goals.
      </p>
    </div>

    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-6 pb-2">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div class="bg-white rounded-xl p-4 shadow h-[140px] flex flex-col justify-center">
          <h3 class="font-semibold text-lg">Personal Training</h3>
          <p class="text-sm opacity-80 mt-1">Get personalized workout plans designed to match your fitness goals.</p>
        </div>

        <div class="bg-lime-200 rounded-xl p-4 shadow h-[140px] flex flex-col justify-center">
          <h3 class="font-semibold text-lg">Progress Tracking</h3>
          <p class="text-sm opacity-80 mt-1">Monitor your daily improvements with clear, visual performance analytics.</p>
        </div>

        <div class="bg-white rounded-xl p-4 shadow h-[140px] flex flex-col justify-center">
          <h3 class="font-semibold text-lg">Nutrition Guidance</h3>
          <p class="text-sm opacity-80 mt-1">Discover healthier eating habits with simple, customized meal suggestions.</p>
        </div>

        <div class="bg-white rounded-xl p-4 shadow h-[140px] flex flex-col justify-center">
          <h3 class="font-semibold text-lg">Online Coaching</h3>
          <p class="text-sm opacity-80 mt-1">Train anytime, anywhere with expert support at your fingertips.</p>
        </div>

      </div>
    </div>

  </div>
</div>

{/* trainers section */}

<div id="trainers" className='m-16 p-10'>
  <div className='text-center flex-col'>
    <h1 className='text-4xl  font-extrabold uppercase'>your fitness<br/>
    <span className='text-[#CDE115] '>goals, their expertise</span></h1>
    <p className='text-lg my-4 text-black font-serif'>Through personalized coaching, cutting edge techniques, and unwavering support,<br/> we'll help you achieve the fitness gaols you've always dreamed of.</p>
  </div>
  <div className='mx-24 my-10'>
    <span className='bg-[#d8f002] px-4 py-2 text-lg rounded-full uppercase font-bold'>meet our trainers</span>
    <div className='my-8 flex justify-between items-center gap-5'>
      <img src={service} class="w-[220px] h-[260px] object-fit" />
      <img src={service} class="w-[220px] h-[260px] object-fit" />
      <img src={service} class="w-[220px] h-[260px] object-fit" />
      <img src={service} class="w-[220px] h-[260px] object-fit" />
    </div>
  </div>
</div>



    </>
  );
}
