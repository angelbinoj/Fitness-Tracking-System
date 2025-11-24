import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

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