import React from 'react'
import { TEACHER_DASHBOARD_STUDENT_LINKS } from '../../lib/Navigation'
import { useLocation, Link } from 'react-router-dom'
function StudentComponent() {
  return (
    <div className='bg-neutral-300 h-screen w-full'>
        <div className='flex flex-wrap'>
            {TEACHER_DASHBOARD_STUDENT_LINKS.map((item)=>(
                <SidebarLink key={item.key} item={item} />
            ))}
        </div>
    </div>
  )
}

function SidebarLink({item}){
    const {pathName} = useLocation()
    return (
        <Link to={item.path} className='bg-neutral-100 p-6 m-3 rounded-lg w-64 h-40 flex items-center text-center'>
            <span className=' text-xl text-center w-full'>{item.label}</span>
        </Link>
    )
}
export default StudentComponent