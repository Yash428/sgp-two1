import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function TimeTable() {
    const selector = useSelector((state)=>state.auth.data)
    const [timeTableData,setTimeTableData] = useState([])
    const studentClass = selector.student_class
    useEffect(()=>{
        axios.post('http://localhost:8002/api/v1/students/timetable',{studentClass: studentClass},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>{
            console.log(result.data.data);
            setTimeTableData( prev=> result.data.data)
        })
        .catch(error=>{
            console.log(error);
        })
    },[])
    return (
        <>
            <section >
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y dark:divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-600 font-semibold dark:text-gray-100">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-center dark:text-gray-300 text-sm font-normal text-gray-700"
                                >
                                    <span>Time</span>
                                </th>
                                <th
                                    scope="col"
                                    className="px-12 py-3.5 text-center dark:text-gray-100 text-sm font-normal text-gray-700"
                                >
                                    Subject Id
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-center dark:text-gray-100 text-sm font-normal text-gray-700"
                                >
                                    Teacher Name
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:text-gray-400 dark:bg-gray-700">
                            {timeTableData.map((t) => (
                            <tr key={t.lec_start_time}>
                                <td className="whitespace-nowrap px-4 py-4">
                                        <div className="ml-4">
                                            <div className="text-sm text-center font-medium text-gray-900">{t.lec_start_time}-{t.lec_end_time}</div>
                                        </div>
                                </td>
                                <td className="whitespace-nowrap px-12 py-4">
                                    <div className="text-sm text-center text-gray-900 ">{t.sub_id}</div>
                                </td>
                                
                                <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                                    {t.teacher_name}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default TimeTable