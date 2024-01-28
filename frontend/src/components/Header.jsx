import React from 'react'
import { Home, User } from 'lucide-react'
import { useSelector } from 'react-redux'
function Header() {
    const data = useSelector((state)=>state.auth.data)
    return (
        <div className=' h-12 px-4 flex justify-between bg-neutral-100 items-center '>
            <div className='text-xl'>Student's Dashboard</div>
            <div>{data.student_id} {data.student_name}</div>
        </div>
    )
}

export default Header