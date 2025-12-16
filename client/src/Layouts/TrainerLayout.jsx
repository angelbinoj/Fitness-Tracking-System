import React from 'react'
import { Outlet } from 'react-router-dom'
import TrainerSidebar from '../components/Trainer/TrainerSidebar'


function TrainerLayout() {
    return (
        <div className="flex">
                    <TrainerSidebar />
        
                    <div className="flex-1 ml-[22px] md:ml-[20%] h-screen overflow-y-auto z-20 bg-green-50 dark:bg-slate-900">
                        <Outlet />
                    </div>
                </div>
    )
}

export default TrainerLayout