import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function TeacherTimeTable() {
    const [teacherTimeTable,setTeacherTimeTable] = useState([])
    const selector = useSelector((state)=>state.auth.data)
    
    
    const teacherId = selector.teacher_id
    useEffect(()=>{
        axios.post('http://localhost:8002/api/v1/teachers/timetable',{teacherId},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>{
            console.log(result.data.data);
            setTeacherTimeTable(result.data.data)
        })
        .catch(error=>{
            console.log(error);
        })
        

    },[])
  return (
    <>
        <section className="mx-auto w-full h-screen px-4 py-4">
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
                                                <span>Time</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-center text-sm font-normal text-gray-700"
                                            >
                                                Subject Name
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                                            >
                                                Subject class
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {teacherTimeTable.map((t) => (
                                        <tr key={t.lec_start_time}>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="ml-4">
                                                        <div className="text-sm text-center font-medium text-gray-900">{t.lec_start_time}-{t.lec_end_time}</div>
                                                    </div>
                                            </td>
                                            <td className="whitespace-nowrap px-12 py-4">
                                                <div className="text-sm text-center text-gray-900 ">{t.subject_name}</div>
                                            </td>
                                            
                                            <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                                                {t.sub_class}
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default TeacherTimeTable