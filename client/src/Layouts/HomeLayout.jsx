import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function HomeLayout() {
    return (
        <>
            <Navbar />
            <main className='mt-40 md:mt-32  z-20'> 
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default HomeLayout