import React from 'react'
import TimeTable from '../../components/teacher/TeacherTimeTable'
import Logout from '../../components/Logout'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/teacher/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/teacher/Sidebar'
function TeacherDashBoard() {
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

export default TeacherDashBoard