import React from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { TiSocialLinkedin, TiSocialFacebook } from "react-icons/ti";
import { IoLocation } from "react-icons/io5";
import { SlEarphonesAlt } from "react-icons/sl";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import '../App.css';

export default function Footer() {
    return (
        <div className='w-full py-8 px-20 bg-[#0f5707]'>
            <div className='text-white ms-14 pt-4'>
                <h2 className='text-4xl  font-bold uppercase'>Get started <span className='text-[#E6FF00]'>Today!</span></h2>
                <div className='my-2 flex gap-5 justify-start items-center'>
                    <p className='font-serif capitalize'>Achieve your goals , one rep at a time. Join us today and unleash your full potential.</p>
                    <button class="bg-[#e5ff00] text-black font-semibold px-4 py-1 rounded-full shadow-md hover:scale-105 transition">
                       <Link to='/signup'><span class="flex justify-center text-lg items-center gap-1">Get Started <HiArrowLongRight /></span></Link> 
                    </button>
                </div>
            </div>
            <hr className='font-bold my-6' />
            <div className='flex justify-between mx-14'>
                <div>
                    <h1 className='logo'>ElevFit</h1>
                    <span className='font-serif capitalize text-xl text-white'>Stronger choices today.<br />A stronger you tomorrow.</span>
                </div>
                <div className='text-center'>
                    <h2 className='uppercase text-[#d4eb05] text-3xl font-semibold'>follow us on</h2>
                    <div className="social-icons mt-6 flex gap-6 justify-center">
                        <a href="#">
                            <TiSocialFacebook className='rounded-full' style={{ background: '#E6FF00', color: 'black', padding: '6px', width: '36px', height: '36px' }} />
                        </a>
                        <a href="#">
                            <FaInstagram className='rounded-full' style={{ background: '#E6FF00', color: 'black', padding: '7px', width: '36px', height: '36px' }} />
                        </a>
                        <a href="#">
                            <FaYoutube className='rounded-full' style={{ background: '#E6FF00', color: 'black', padding: '7px', width: '36px', height: '36px' }} />
                        </a>
                        <a href="#">
                            <TiSocialLinkedin className='rounded-full' style={{ background: '#E6FF00', color: 'black', padding: '6px', width: '36px', height: '36px' }} />
                        </a>
                    </div>
                </div>
                <div>
                    <h2 className='uppercase text-[#d4eb05] text-2xl font-semibold'>contact info</h2>
                    <div className='flex flex-col mt-2 justify-start gap-2 text-white'>
                        <span className='flex gap-2 '><IoLocation style={{ width: '20px', height: '20px' }} /> 736 Blue Spring Ave. Smithtown<br /> NY 11867</span>
                        <span className='flex gap-2 '><MdEmail style={{ width: '20px', height: '20px' }} /> info@helpline.com</span>
                        <span className='flex gap-2 '><SlEarphonesAlt style={{ width: '18px', height: '18px' }} /> +91 8976002221</span>
                    </div>
                </div>
            </div>
        </div>
    );
}