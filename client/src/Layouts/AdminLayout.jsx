import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/Admin/AdminSidebar'

function AdminLayout() {
    return (
        <div className="flex">
            <AdminSidebar />

            <div className="flex-1 ml-[22px] md:ml-[20%] h-screen overflow-y-auto z-20 bg-green-50 dark:bg-slate-900">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout
