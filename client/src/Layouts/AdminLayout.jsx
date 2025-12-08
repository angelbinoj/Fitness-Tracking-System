import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/Admin/AdminSidebar'


function AdminLayout() {
    return (
        <>
        <div className="flex">
        <div className="fixed top-0 left-0 w-[20%] h-screen">
          <AdminSidebar />
        </div>
        <div className="ml-[20%] w-[80%] h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
            
        </>
    )
}

export default AdminLayout