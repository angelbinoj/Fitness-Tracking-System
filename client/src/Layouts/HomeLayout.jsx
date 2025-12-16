import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function HomeLayout() {
    return (
        <>
            <Navbar />
            <main className='mt-36 md:mt-20 pt-4 md:pt-10 z-20 bg-white dark:bg-slate-950'> 
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default HomeLayout