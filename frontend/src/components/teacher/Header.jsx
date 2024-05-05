import React from 'react'
import { useSelector } from 'react-redux'
import {currentUser} from '../../store/authSlice'

function Header() {
  const teacherData = useSelector(currentUser)

  return (
    <div className=' h-12 px-4 flex justify-between bg-neutral-100 items-center '>
        <div className='text-xl'>Teacher's Dashboard</div>
        <div>{teacherData.teacher_id} {teacherData.teacher_name}</div>
    </div>
  )
}

export default Header