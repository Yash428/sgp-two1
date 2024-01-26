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
    <>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                                        >
                                            <span>Subject Id</span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-center text-sm font-normal text-gray-700"
                                        >
                                            Total
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                                        >
                                            Percentage
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {attendanceData.map((t) => (
                                    <tr key={t.subjectId}>
                                        <td className="whitespace-nowrap px-4 py-4">
                                                <div className="ml-4">
                                                    <div className="text-sm text-center font-medium text-gray-900">{t.subjectId}</div>
                                                </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                            <div className="text-sm text-center text-gray-900 ">{t.pre}/{t.tot}</div>
                                        </td>
                                        
                                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                                            {t.subjectWiseAttendance}
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                    <tr>
                                        <td
                                            scope="col"
                                            className="px-4 py-3.5 text-center text-lg font-bold text-gray-800"
                                        >
                                            <span>Overall Attendance:- </span>
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-12 py-3.5 text-center text-sm font-normal text-gray-700"
                                        >
                                            
                                        </td>

                                        <td
                                            scope="col"
                                            className="px-4 py-3.5 text-center text-sm font-bold text-gray-800"
                                        >
                                            {overAllAttendance.overallAttendance}%
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default AttendanceSummary