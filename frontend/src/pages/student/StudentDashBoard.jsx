import React from 'react'
import TimeTable from '../../components/student/TimeTable'
import AttendanceSummary from '../../components/student/AttendanceSummary'
import Logout from '../../components/Logout'
import SetPassword from '../../components/student/settings/SetPassword'
import { useSelector } from 'react-redux'
import Sidebar from '../../components/student/Sidebar'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'
function StudentDashBoard() {
  return (
    <>
    <div className='flex flex-row bg-neutral-100 h-screen overflow-hidden '>
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

export default StudentDashBoard