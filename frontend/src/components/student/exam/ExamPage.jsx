import React from 'react'

function ExamPage() {
  return (
    <div className='bg-neutral-300 h-screen'>
        <div className='p-4 bg-neutral-100 rounded-lg text-2xl flex items-center justify-center m-2'>Exam Section</div>
        <div className='h-full bg-neutral-100 m-2 rounded-lg flex flex-col overflow-y-auto'>
            <div className='flex flex-row h-1/2 '>
                <div className='w-1/2 p-4'>
                <div className='flex items-center justify-center text-xl'> 
                    Exam Time Table
                </div>
                <div>

                </div>
                </div>
                <div className='w-1/2 p-4'>
                    <div className='flex items-center justify-center text-xl'>
                        Hall Ticket
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='w-1/2 p-4'>
                    <div className='flex items-center justify-center text-xl'>
                        Marks
                    </div>
                    <div></div>
                </div>
                <div className='w-1/2 p-4'>
                    <div className='flex items-center justify-center text-xl'>
                        Result
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExamPage