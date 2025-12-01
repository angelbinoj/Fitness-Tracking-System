import React from 'react'
import { Outlet } from 'react-router-dom'
import TrainerSidebar from '../components/Trainer/TrainerSidebar'


function TrainerLayout() {
    return (
        <>
        <div className='grid grid-cols-[20%_80%] w-full'>

            <TrainerSidebar/>
            <main> 
                <Outlet />
            </main>
        </div>
            
        </>
    )
}

export default TrainerLayout