import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import Header from '../../components/admin/Header'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
    return (
        <>
            <div className='flex flex-row bg-neutral-300 h-screen overflow-hidden'>
                <div><Sidebar/></div>
                <div className='flex-1'>
                    <Header />
                    <div className='flex flex-col'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard