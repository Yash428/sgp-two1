import React from 'react'
import { Link } from 'react-router-dom'
function AdminExamPage() {
    return (
        <div className=' h-screen bg-neutral-300'>
            <div className='flex-wrap  m-2 rounded-lg flex flex-row overflow-y-auto'>
                <Link to={'/admin/exam/timeTable'} className='bg-neutral-100 p-6 m-3 rounded-lg w-64 h-40 flex items-center text-center'><span className=' text-xl text-center w-full'>View/Edit Exam Time Table</span></Link>
                <Link to={'/admin/exam/marks'} className='bg-neutral-100 p-6 m-3 rounded-lg w-64 h-40 flex items-center text-center'><span className=' text-xl text-center w-full'>View/Edit Marks</span></Link>
                <Link to={'/admin/exam/result'} className='bg-neutral-100 p-6 m-3 rounded-lg w-64 h-40 flex items-center text-center'><span className=' text-xl text-center w-full'>Results</span></Link>
            </div>
        </div>
    )
}

export default AdminExamPage