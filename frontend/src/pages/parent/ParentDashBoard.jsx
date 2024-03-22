import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/parent/Sidebar.jsx'
import Header from '../../components/parent/Header.jsx'
function ParentDashBoard() {
  return (
    <div>
        <div className='flex flex-row bg-neutral-200 h-screen overflow-hidden '>
        <div><Sidebar/></div>
        <div className='flex-1'>
            <Header />
            <div className='flex flex-col'>
                <Outlet />
            </div>
        </div>
    </div>
    </div>
  )
}

export default ParentDashBoard