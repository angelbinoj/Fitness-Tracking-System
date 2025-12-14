import React from 'react';
import { HiArrowLongRight } from "react-icons/hi2";
import service from '../assets/service.jpg';
import gymMen from '../assets/gymMen.png';
import men from '../assets/men.png';
import gymWomen from '../assets/gymWomen.jpg';
import gymWomen2 from '../assets/gymWomen2.png';
import gymMen2 from '../assets/gymMen2.png';
import { Link } from 'react-router-dom';

export default function HomePage() {

  const images = [
    {
      img: gymMen2,
      name: "Arun",
      specialization: "Strength Training Expert"
    },
    {
      img: gymWomen,
      name: "Aishwarya",
      specialization: "Certified Yoga Instructor"
    },
    {
      img: men,
      name: "Aghil",
      specialization: "Mobility & Recovery Coach"
    },
    {
      img: gymWomen2,
      name: "Aishwarya",
      specialization: "Functional Fitness Coach"
    },
  ]

  return (
    <>
      {/* banner section */}
      <div className="mt-6 sm:mt-10 mx-4 sm:mx-8 lg:mx-16 bg-[#0f4d0f] bg-gradient-to-r from-[#0f4d0f] to-[#0b3a0b]
            px-6 sm:px-10 lg:px-14 pt-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10">
        <div className="md:w-1/2 w-full">
          <h1 className="text-[#f0ffa8] text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-extrabold leading-tight">
            Elevate your <br />
            fitness journey
          </h1>

          <p className="text-white opacity-80 mt-3 sm:mt-4 text-sm sm:text-base">
            With dedicated coaching, real-time progress tracking, and supportive guidance,
            we help you achieve the fitness goals you've always wanted.
          </p>

          <div className="mt-4 sm:mt-6 flex items-center gap-4">
            <button className="bg-[#e5ff00] text-black font-semibold px-4 sm:px-6 py-2 rounded-full shadow-md hover:scale-105 transition">
              <Link to='/signup'><span className="flex justify-center text-base sm:text-xl items-center gap-1">Get Started <HiArrowLongRight /></span></Link>
            </button>
          </div>
        </div>
        <div className="relative md:w-1/2 w-full flex justify-center items-center pb-5 md:pb-0">
          <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] 
                    bg-[#e5ff00] opacity-50 blur-[120px] rounded-full
                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <img src={gymMen}
               className="relative z-20 w-[200px] sm:w-[260px] md:w-[320px] object-contain" />
        </div>
      </div>

      {/* about section */}
      <div id="about" className='my-8 sm:my-12 lg:my-16 mx-4 sm:mx-8 lg:mx-16 px-4 sm:px-6 lg:px-10 h-fit grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='uppercase flex flex-col lg:ps-20 mt-6 items-start gap-5 sm:gap-7'>
          <span className='bg-[#d8f002] px-3 py-1 rounded-full font-bold text-sm sm:text-base'>about us</span>
          <h1 className="text-green-950 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            The <span className='text-[#D7EF00]'>power</span><br />
            behind your<br />
            vision
          </h1>
        </div>
        <div className='flex flex-col justify-center gap-4'>
          <div>
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
              ElevFit is dedicated to helping you achieve your fitness and wellness goals through
              expert coaching, personalized workout plans, and smart progress tracking.
              We support you every step of the way in building a healthier lifestyle.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">        
            <div className="bg-[#c2e901] p-6 sm:p-8 rounded-xl shadow">
              <h3 className="text-green-900 font-bold text-lg sm:text-xl">OUR VISION</h3>
              <p className="text-green-900 mt-2 sm:mt-3 leading-relaxed text-sm sm:text-base">
                To inspire individuals to lead healthier, stronger, and more fulfilling lives
                through fitness, discipline, and wellness.
              </p>
            </div>        
            <div className="bg-[#fdfff2] p-6 sm:p-8 rounded-xl shadow border">
              <h3 className="text-green-900 font-bold text-lg sm:text-xl">OUR MISSION</h3>
              <p className="text-gray-700 mt-2 sm:mt-3 leading-relaxed text-sm sm:text-base">
                To empower individuals with tailored fitness solutions that build confidence,
                strength, and healthy habits that last a lifetime.
              </p>
            </div>
          </div>
        </div>      
      </div>

      {/* service section */}
      <div id='service' className="mt-8 sm:mt-12 lg:mt-16 px-3 sm:px-6 flex justify-center">
        <div className="w-full max-w-6xl relative rounded-3xl overflow-hidden">
          
          <img src={service}
               className="w-full h-[400px] sm:h-[500px] object-cover object-top" />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute top-3 sm:top-5 left-4 sm:left-10 text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">WHAT WE OFFER</h2>
            <p className="text-xs sm:text-sm md:text-base mt-1 opacity-80">
              Personalized coaching to help you reach your goals.
            </p>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-3 sm:px-6 pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

              <div className="bg-white rounded-xl p-3 sm:p-4 shadow h-[120px] sm:h-[140px] flex flex-col justify-center">
                <h3 className="font-semibold text-base sm:text-lg">Personal Training</h3>
                <p className="text-xs sm:text-sm opacity-80 mt-1">Get personalized workout plans designed to match your fitness goals.</p>
              </div>

              <div className="bg-lime-200 rounded-xl p-3 sm:p-4 shadow h-[120px] sm:h-[140px] flex flex-col justify-center">
                <h3 className="font-semibold text-base sm:text-lg">Progress Tracking</h3>
                <p className="text-xs sm:text-sm opacity-80 mt-1">Monitor your daily improvements with clear, visual performance analytics.</p>
              </div>

              <div className="bg-white rounded-xl p-3 sm:p-4 shadow h-[120px] sm:h-[140px] flex flex-col justify-center">
                <h3 className="font-semibold text-base sm:text-lg">Nutrition Guidance</h3>
                <p className="text-xs sm:text-sm opacity-80 mt-1">Discover healthier eating habits with simple, customized meal suggestions.</p>
              </div>

              <div className="bg-white rounded-xl p-3 sm:p-4 shadow h-[120px] sm:h-[140px] flex flex-col justify-center">
                <h3 className="font-semibold text-base sm:text-lg">Online Coaching</h3>
                <p className="text-xs sm:text-sm opacity-80 mt-1">Train anytime, anywhere with expert support at your fingertips.</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* trainers section */}
      <div id="trainers" className='m-4 sm:m-8 lg:m-16 p-4 sm:p-6 lg:p-10'>
        <div className='text-center flex-col'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase'>your fitness<br/>
          <span className='text-[#CDE115]'>goals, their expertise</span></h1>
          <p className='text-sm sm:text-base lg:text-lg my-3 sm:my-4 text-black font-serif px-4'>Through personalized coaching, cutting edge techniques, and unwavering support,<br className="hidden sm:block"/> we'll help you achieve the fitness goals you've always dreamed of.</p>
        </div>
        <div className='mx-0 sm:mx-8 lg:mx-24 my-6 sm:my-8 lg:my-10'>
          <span className='bg-[#d8f002] px-3 sm:px-4 py-1.5 sm:py-2 text-base sm:text-lg rounded-full uppercase font-bold'>meet our trainers</span>
          <div className='my-6 sm:my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'>
            {images.map((trainer, index) => (
              <div key={index} className='relative group overflow-hidden rounded-lg'>
                <img 
                  src={trainer.img} 
                  alt={trainer.name}
                  className="w-full h-[260px] sm:h-[280px] object-cover" 
                />
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4'>
                  <h3 className='text-white font-bold text-lg'>{trainer.name}</h3>
                  <p className='text-white/90 text-sm'>{trainer.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}