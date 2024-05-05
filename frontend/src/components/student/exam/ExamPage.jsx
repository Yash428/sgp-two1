import React from 'react'
import { Link } from 'react-router-dom'

function ExamPage() {
    return (
        <div className=' h-screen bg-neutral-300'>
            <div className='h-full  m-2 rounded-lg flex flex-row overflow-y-auto'>
                <Link to={'/student/exam/timeTable'} className='bg-neutral-100 p-6 m-3 rounded-lg w-64 h-40 flex items-center text-center'><span className=' text-xl text-center w-full'>Exam Time Table</span></Link>
                <Link to={'/student/exam/result'} className='bg-neutral-100 p-6 m-3 rounded-lg w-64 h-40 flex items-center text-center'><span className=' text-xl text-center w-full'>Result</span></Link>
            </div>
        </div>
    )
}

export default ExamPage