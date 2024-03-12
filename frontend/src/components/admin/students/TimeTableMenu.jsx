import React from 'react'
import { Link } from 'react-router-dom'

function TimeTableMenu() {
  return (
    <div className='h-screen bg-neutral-300'>
        <div className='bg-neutral-100 text-2xl m-2 rounded-lg px-2 py-4 flex justify-center'>
            Time Table
        </div>
        <div className=' text-xl m-2 rounded-lg flex '>
            <div className='flex flex-row text-center'>
                <div className='bg-neutral-100 p-6 m-3 rounded-lg w-64 h-40 flex justify-center items-center '>
                    <Link to={'/admin/students/timeTable/addTimeTable'}>
                        Add Time Table
                    </Link>
                </div>
                <div className='bg-neutral-100 p-6 m-3 rounded-lg w-64 h-40 flex justify-center items-center text-center'>
                    <Link to={'/admin/students/timeTable/viewTimeTable'} >
                        View Time Table
                    </Link>
                </div>
                <div className='bg-neutral-100 p-6 m-3 rounded-lg w-64 h-40 flex justify-center items-center text-center'>
                    <Link to={'/admin/students/timeTable/editTimeTable'} >
                        Edit Time Table
                    </Link>
                    </div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default TimeTableMenu