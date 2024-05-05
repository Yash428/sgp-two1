import React from 'react'
import { Outlet } from 'react-router-dom'

function ExamHomePage() {
  return (
    <div className='bg-neutral-300 h-screen'>
      <Outlet />
    </div>
  )
}

export default ExamHomePage