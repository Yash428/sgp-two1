import React from 'react'
import { TEACHER_DASHBOARD_STUDENT_LINKS } from '../../../components/lib/Navigation'
import { useLocation,Link, Outlet } from 'react-router-dom'

function StudentPage() {
  return (
    <Outlet />
  )
}


export default StudentPage