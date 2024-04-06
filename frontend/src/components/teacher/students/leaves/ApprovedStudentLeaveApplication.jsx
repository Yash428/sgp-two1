import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
function ApprovedStudentLeaveApplication() {
    const [leaveData,setLeaveData] = useState([])
    const teacher_class = useSelector(state=>state.auth.data.teacher_class)
    useEffect(()=>{
        axios.post('http://localhost:8002/api/v1/teachers/students/allAproved',{
            teacher_class
        },{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                "role": `Bearer ${localStorage.getItem('role')}`
            }
        })
        .then(result=>result.data)
        .then(result=>{
            console.log(result.data);
            setLeaveData(result.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <div>
        <div className='flex flex-col h-screen m-2 mt-0 bg-neutral-100 rounded-lg p-2'>
        <div className='flex text-2xl p-2 items-center justify-center'>Approved Applications</div>
        <div className=' '>
            <div className=' m-2 border border-black mx-1'>
                <div className='head flex justify-center px-1 py-2 bg-neutral-300 items-center flex-row w-full'>
                    <div className='w-1/6 flex justify-center items-center'>Sr no</div>
                    <div className='w-1/6 flex justify-center items-center'>Application Date</div>
                    <div className='w-1/6 flex justify-center items-center'>Review Date</div>
                    <div className='w-1/5 flex justify-center items-center'>Period</div>
                    <div className='w-1/4 flex justify-center items-center'>Reason</div>
                    <div className='w-1/6 flex justify-center items-center' >Status</div>
                </div>
                <div className='body divide-y-2 flex flex-col h-80 overflow-y-auto'>
                    {
                        leaveData.map((item,index)=>{
                            return (
                                <div key={index} className='flex justify-center items-center px-1 py-2 flex-row w-full'>
                                    <div className='w-1/6 flex justify-center items-center'>{index+1}</div>
                                    <div className='w-1/6 flex justify-center items-center'>{item.appli_date}</div>
                                    <div className='w-1/6 flex justify-center items-center'>{item.review_date}</div>
                                    <div className='w-1/5 flex justify-center items-center'>{item.start_date} to {item.end_date}</div>
                                    <div className='w-1/4 flex justify-center items-center'>{item.reason}</div>
                                    <div className='w-1/6 flex justify-center items-center'>{item.status} </div>
                                    
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

export default ApprovedStudentLeaveApplication