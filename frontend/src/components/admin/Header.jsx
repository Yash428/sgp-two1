import React from 'react'
import { useSelector } from 'react-redux'

function Header() {
    const admin = useSelector((state)=>state.auth.data)
    return (
        <div className=' h-12 px-4 flex justify-between bg-neutral-100 items-center'>
            <div className='text-xl'>Admin's Dashboard</div>
            <div>{admin.admin_id} {admin.admin_name}</div>
        </div>
    )
}

export default Header