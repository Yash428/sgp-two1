import React from 'react'
import { Outlet } from 'react-router-dom'
function AdminExamHomePage() {
    return (
        <div className='bg-neutral-300 h-screen'>
            <Outlet />
        </div>
    )
}

export default AdminExamHomePage