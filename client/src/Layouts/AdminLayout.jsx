import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/Admin/AdminSidebar'


function AdminLayout() {
    return (
        <>
        <div className='grid grid-cols-[20%_80%] w-full'>

            <AdminSidebar/>
            <main> 
                <Outlet />
            </main>
        </div>
            
        </>
    )
}

export default AdminLayout