import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function AttendanceSummary() {
    const [attendanceData,setAttendanceData] = useState([])
    const selector = useSelector((state)=>state.auth.data)
    const [overAllAttendance,setOverAllAttendance] = useState({})
    const studentId = selector.student_id
    const studentClass = selector.student_class
    useEffect(()=>{
        axios.post('http://localhost:8002/api/v1/students/getAttendance',{
            studentId,
            studentClass
        },{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>{
            console.log(result.data.data);
            // let n = result.data.data.length 
            // console.log(n);
            //console.log(result.data.data[n-1]);
            let p = result.data.data.pop()
            console.log(p);
            setAttendanceData(result.data.data)
            setOverAllAttendance(p)
            console.log(overAllAttendance);
        })
        .catch(error=>{
            console.log(error);
        })
    },[])
    
  return (
        <div className=" flex items-center justify-center bg-neutral-300  w-full">
            <table className="w-full divide-y divide-gray-200 m-3 dark:divide-gray-500">
                <thead className="bg-gray-50 dark:bg-gray-700 dark:text-white">
                    <tr className='dark:text-gray-400 text-base text-gray-700'>
                        <th
                            scope="col"
                            className="px-4 py-3.5 text-center font-normal"
                        >
                            <span>Subject Id</span>
                        </th>
                        <th
                            scope="col"
                            className="px-12 py-3.5 text-center text-sm font-normal"
                        >
                            Total
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3.5 text-center text-sm font-normal"
                        >
                            Percentage
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-500 bg-white dark:bg-gray-800">
                    {attendanceData.map((t) => (
                    <tr key={t.subjectId} className='dark:text-gray-400  text-gray-900'>
                        <td className="whitespace-nowrap px-4 py-4">
                                <div className="ml-4">
                                    <div className="text-sm text-center font-medium dark:text-white">{t.subjectId}</div>
                                </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-center ">{t.pre}/{t.tot}</div>
                        </td>
                        
                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {t.subjectWiseAttendance}%
                        </td>
                    </tr>
                    ))}
                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-600">
                    <tr>
                        <td
                            scope="col"
                            className="px-4 py-3.5 text-center text-lg font-bold text-gray-800 dark:text-gray-100"
                        >
                            <span>Overall Attendance:- </span>
                        </td>
                        <td
                            scope="col"
                            className="px-12 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-gray-100"
                        >
                            
                        </td>

                        <td
                            scope="col"
                            className="px-4 py-3.5 text-center text-sm font-bold text-gray-800 dark:text-gray-100"
                        >
                            {overAllAttendance.overallAttendance}%
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
  )
}

export default AttendanceSummary