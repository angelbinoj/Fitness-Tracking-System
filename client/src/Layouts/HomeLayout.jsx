import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function HomeLayout() {
    return (
        <>
            <Navbar />
            <main> 
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default HomeLayout