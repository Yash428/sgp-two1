import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function LeaveApplication() {
  return (
    <div className='h-screen bg-neutral-300' >
        <div className='text-2xl p-4 m-2 rounded-lg h-16 bg-neutral-100 flex items-center justify-center'>Leave Applications </div>
        <div className='flex flex-row w-full  h-24'>
            <Link to={'add'} className='flex flex-col items-center w-1/4 justify-center p-4 m-2 bg-neutral-100 text-xl rounded-lg'>Add New Application</Link>
            <Link to={'pending'} className='flex flex-col items-center w-1/4 justify-center p-4 m-2 bg-neutral-100 text-xl rounded-lg'>Pending</Link>
            <Link to={'approved'} className='flex flex-col items-center w-1/4 justify-center p-4 m-2 bg-neutral-100 text-xl rounded-lg'>Approved</Link>
            <Link to={'rejected'} className='flex flex-col items-center w-1/4 justify-center p-4 m-2 bg-neutral-100 text-xl rounded-lg'>Rejected</Link>
        </div>
        <div className=''>
            <Outlet />
        </div>
    </div>
  )
}

export default LeaveApplication