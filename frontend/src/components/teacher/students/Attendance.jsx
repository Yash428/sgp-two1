import React, { useEffect, useId, useState } from 'react'
import Button from '../../Button.jsx'
import {Link, Outlet} from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
function Attendance() {
    const buttonCss = 'px-4 py-2 rounded-lg bg-neutral-200 border-black text-black'

    const [pendingAttendance,setPendingAttendance] = useState([])
    const teacherId = useSelector((state)=>state.auth.data.teacher_id)
    
    useEffect(()=>{
        axios.post("http://localhost:8002/api/v1/teachers/students/attendance",{teacherId},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>{
            console.log(result.data.data);
            setPendingAttendance(result.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    return (
    <div className='h-screen bg-neutral-400'>
        <div className=' h-24 bg-neutral-100 m-4 rounded-lg min-w-96 flex items-center sticky'>
            <span className=' p-6 text-2xl '> Pending Attendance </span>
        </div>
        <div className='overflow-y-scroll h-5/6'>
            <div className=" overflow-auto min-w-full  py-2 align-middle md:px-6 lg:px-8">
                <div className="border border-gray-200 md:rounded-lg">
                    <table className="w-full divide-y h-full divide-gray-200">
                        <thead className="bg-gray-50 flex ">
                            <tr className='flex w-full sticky 0'>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 w-1/5"
                                >
                                    <span>Date</span>
                                </th>
                                <th
                                    scope="col"
                                    className="px-12 py-3.5 text-center text-sm font-normal text-gray-700  w-1/5"
                                >
                                    Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700  w-1/5"
                                >
                                    Class
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700  w-1/5"
                                >
                                    subject
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700  w-1/5"
                                >
                                {' '}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y flex flex-col divide-gray-200 w-full items-center justify-center bg-white overflow-y-scroll">
                            {
                            pendingAttendance.map((item) => (
                                <tr key={item.att_p_id} className='w-full flex'>
                                    <td className="whitespace-nowrap px-4 py-4 w-1/5">
                                        <div className="ml-4">
                                            <div className="text-sm text-center font-medium text-gray-900">{item.cl_date}</div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-12 py-4 w-1/5">
                                        <div className="text-sm text-center text-gray-900 ">{item.lec_start_time}-{item.lec_end_time} </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium w-1/5">
                                        <div className="text-sm text-center text-gray-900 ">{item.sub_class}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium w-1/5">
                                        <div className="text-sm text-center text-gray-900 ">{item.subject_name}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium w-1/5">
                                        <div className="text-sm text-center text-gray-900 "><Link className={buttonCss} to={`/teacher/students/fillAttendance/${item.att_p_id}`}>Fill</Link></div>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Attendance