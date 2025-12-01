import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from '../components/User/UserSidebar'


function UserLayout() {
    return (
        <>
        <div className='grid grid-cols-[20%_80%] w-full'>

            <UserSidebar/>
            <main> 
                <Outlet />
            </main>
        </div>
            
        </>
    )
}

export default UserLayout