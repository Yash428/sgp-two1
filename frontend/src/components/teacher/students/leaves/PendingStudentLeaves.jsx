import React, { useEffect, useState } from 'react'
import Input from '../../../Input'
import { useSelector } from 'react-redux'
import Button from '../../../Button'
import axios from 'axios'
import { Link } from 'react-router-dom'

function PendingStudentLeaves() {
    const teacher = useSelector(state=>state.auth.data)
    const [leaveData,setLeaveData] = useState([{}])
    useEffect(()=>{
        axios.post("http://localhost:8002/api/v1/teachers/students/getPendingLeaves",{teacher_class: teacher.teacher_class},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                "role": `Bearer ${localStorage.getItem('role')}`
            }
        })
        .then(response=>response.data)
        .then(response =>{
            console.log(response.data);
            setLeaveData(response.data)
        })
    },[])
  return (
    <div>
        <div className='flex flex-col h-screen m-2 mt-0 bg-neutral-100 rounded-lg p-2'>
        <div className='flex text-2xl p-2 items-center justify-center'>Pending Applications</div>
        <div className=' '>
            <div className=' m-2 border border-black mx-1'>
                <div className='head flex justify-center px-1 py-2 bg-neutral-300 items-center flex-row w-full'>
                    <div className='w-1/6 flex justify-center items-center'>Sr no</div>
                    <div className='w-1/6 flex justify-center items-center'>Application Date</div>
                    <div className='w-1/5 flex justify-center items-center'>Period</div>
                    <div className='w-1/4 flex justify-center items-center'>Reason</div>
                    <div className='w-1/6 flex justify-center items-center' >Status</div>
                    <div className='w-1/5 flex justify-center items-center'>{' '}</div>
                </div>
                <div className='body divide-y-2 flex flex-col h-80 overflow-y-auto'>
                    {
                        leaveData.map((item,index)=>{
                            return (
                                <div key={index} className='flex justify-center items-center px-1 py-2 flex-row w-full'>
                                    <div className='w-1/6 flex justify-center items-center'>{index+1}</div>
                                    <div className='w-1/6 flex justify-center items-center'>{item.appli_date}</div>
                                    <div className='w-1/5 flex justify-center items-center'>{item.start_date} to {item.end_date}</div>
                                    <div className='w-1/4 flex justify-center items-center'>{item.reason}</div>
                                    <div className='w-1/6 flex justify-center items-center'>{item.status} </div>
                                    <div className='w-1/5 flex justify-center items-center'>
                                        <Link to={`/teacher/students/leaveApplications/view/${item.sl_id}`} className='mr-1'><Button>View</Button></Link>
                                        <div className='mx-1'><Button  bgColor='bg-green-700'>Approve</Button></div>
                                        <div className='ml-1'><Button  bgColor='bg-red-700'>Reject</Button></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PendingStudentLeaves