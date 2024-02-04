import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import Button from "../../Button.jsx"


function FillAttendance() {
    const {att_p_id} = useParams()
    const navigate  = useNavigate()
    //roll no, name, fill for input
    const buttonCss = 'px-4 py-2 rounded-lg bg-neutral-200 border-black text-black'
    
    const [attendanceData,setAttendanceData] = useState([])
    const [student_ids,setStudent_ids] = useState([])
    const [lectureData,setLectureData] = useState([])
    
    const handleToggle = (student_id)=>{
        setAttendanceData((prev)=>(prev.map((student)=>(student.student_id === student_id ? {...student, is_present: !student.is_present}:student)))
        )
        console.log(attendanceData);
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8002/api/v1/teachers/students/fillAttendance",{att_p_id,attendanceData})
        .then(
            result=>{
                console.log("done");
                navigate("/teacher/students/attendance")
            }
        )
        .catch(error=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        axios.post("http://localhost:8002/api/v1/teachers/students/getAllStudentsByAttPId",{att_p_id})
        .then(result=>{
            console.log(result.data.data);
            setAttendanceData(result.data.data)
        })
        .catch(error=>{
            console.log(error);
        })
        axios.post("http://localhost:8002/api/v1/teachers/students/getLectureData",{att_p_id})
        .then(result=>{
            console.log(result.data.data);
            setLectureData(result.data.data[0])
        })
        .catch(error=>{
            console.log(error);
        })

        axios.post("http://localhost:8002/api/v1/teachers/students/getStudentIdByAttPId",{att_p_id})
        .then(result=>{
            console.log(result.data.data);
            setStudent_ids(result.data.data)
        })
    },[])
    
    return (
        <form className='h-screen bg-neutral-400 ' onSubmit={handleSubmit}>
            <div className=' h-12 bg-neutral-100 m-4 rounded-lg flex items-center'>
                <div className='flex '>
                <span className=' p-6 text-2xl '>Fill Attendance</span>
                </div>
            <div className='flex px-8 flex-row flex-wrap items-center justify-center'>
                <span className='p-4'>Class: {lectureData.sub_class}</span>
                <span className='p-4'>Subject: {lectureData.sub_id} </span>
                <span className='p-4'>Lecture Time: {lectureData.lec_start_time} - {lectureData.lec_end_time}</span>
                
            </div>
            
            <div className='flex-1 right-0 ml-20'>
                <Button type='submit'>Submit</Button>
                </div>
            </div>
            <div className='h-5/6 overflow-y-scroll rounded-lg' onSubmit={handleSubmit}>
            <div className=" min-w-full py-2  align-middle h-screen md:px-6 lg:px-8 ">
                <div className="border border-gray-200 md:rounded-lg ">
                    <table className="w-full  divide-y block divide-gray-200 rounded-lg" >
                        <thead className="bg-gray-50 flex sticky top-0 rounded-t-lg">
                            <tr className='flex w-full'>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 w-1/3"
                                >
                                    <span>Roll No.</span>
                                </th>
                                <th
                                    scope="col"
                                    className="px-12 py-3.5 text-center text-sm font-normal text-gray-700 w-1/3"
                                >
                                    Name
                                </th>
                                
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 w-1/3"
                                >
                                Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y flex flex-col divide-gray-200 items-center justify-center bg-white overflow-y-scroll" >
                            {
                            attendanceData.map((item) => (
                                <tr key={item.student_id} className='w-full flex'>
                                        <td className="whitespace-nowrap px-4 py-3 w-1/3">
                                        <div className="ml-4">
                                            <div className="text-sm text-center font-medium text-gray-900">{item.student_id}</div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-12 py-4  w-1/3">
                                        <div className="text-sm text-center text-gray-900 ">{item.student_name}</div>
                                    </td>
                                    
                                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium  w-1/3">
                                        <div className="text-sm text-center text-gray-900 ">
                                            <label className="relative inline-flex items-center me-5 cursor-pointer">
                                                <input type="checkbox" value={item.is_taken} onChange={()=>handleToggle(item.student_id)}  className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Present</span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            
        </form>
  )
}

export default FillAttendance