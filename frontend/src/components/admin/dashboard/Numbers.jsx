import React, { useEffect, useState } from 'react'
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import axios from 'axios';

import DonutChart from '../../../charts/DonutChart';
import Button from '../../Button.jsx'
function Numbers() {
    const [studentNo,setStudentNo] = useState(0)
    const [teacherNo,setTeacherNo] = useState(0)
    useEffect(()=>{
        axios.post('http://localhost:8002/api/v1/admin/student/getStudentCount',{},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(result=>{
            //console.log(result.data.data[0].studentCount);
            setStudentNo(result.data.data[0].studentCount)
        })
        .catch(err=>{
            console.log(err);
        })
        axios.post('http://localhost:8002/api/v1/admin/teacher/getTeacherCount',{},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(result=>{
            //console.log(result.data.data[0].teacherCount);
            setTeacherNo(result.data.data[0].teacherCount)
        })
    })
    const data = [
        { label: 'A', value: 10 },
        { label: 'B', value: 20 },
        { label: 'C', value: 30 },
        { label: 'D', value: 40 },
    ];
    const [studentData,setStudentData] = useState()
    const [category,setCategory] = useState('')
    useEffect(()=>{
        axios.post('http://localhost:8002/api/v1/admin/student/data/studentByGender',{},{
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).then(result=>{
                console.log(result.data.data[0])
                const data = [{label: result.data.data[0][0].student_gender,value:result.data.data[0][0].count},
                {label: result.data.data[0][1].student_gender,value:result.data.data[0][1].count}]
                console.log(data);
                setStudentData(data)
            })
    },[])
    
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col w-1/2'>
            <div className='flex flex-row w-full'>
                <div className='py-2 w-1/3 flex flex-row px-4 m-2 bg-neutral-100 rounded-lg '>
                    <div className='h-full w-12 flex justify-center items-center text-3xl'>
                        <PiStudent />
                    </div>
                    <div className='flex text-lg flex-col justify-center'>
                        <div className=''>{studentNo}</div>
                        <div>Students</div>
                    </div>
                </div>
                <div className='py-2 w-1/3 flex flex-row px-4 m-2 bg-neutral-100 rounded-lg'>
                    <div className='h-full w-12 flex justify-center items-center text-3xl'>
                        <FaChalkboardTeacher />
                    </div>
                        <div className='flex text-lg flex-col justify-center'> 
                            <div>{teacherNo}</div>
                            <div>Teachers</div>
                        </div>
                    </div>
                
            </div>
        </div>
            <div className='flex flex-row'>
            <div className='flex flex-col w-1/3  items-center bg-neutral-100 m-2 rounded-lg'>
                <div>
                    <DonutChart data={studentData} width={300} height={300}  />
                </div>
                <div>
                    Student Distribution by Gender
                </div>
            </div>
            <div className='flex flex-col w-1/3  items-center bg-neutral-100 m-2 rounded-lg'>
                <div>
                    <DonutChart data={studentData} width={300} height={300}  />
                </div>
                <div>
                    Sudent Distribution by Attendance
                </div>
            </div>
            {/* <div className='flex flex-col w-1/3  items-center bg-neutral-100 m-2 rounded-lg'>
                <div>
                    <DonutChart data={studentData} width={300} height={300}  />
                </div>
                <div>
                    <select name="student_gender" onChange={e=>setCategory(e.target.value)} value={category} className='h-10 p-2 rounded-lg w-80 bg-neutral-100'>
                        <option value="">Select</option>
                        <option value="gender">Student Distribution by Gender</option>
                        <option value="Attendance">Student Distribution by Attendance</option>
                        <option value="class">Student Distribution by Class</option>
                    </select>
                    <Button type='submit' onClick={handleSubmit} >Submit</Button>
                </div>
            </div> */}
            </div>
        </div>
        
    )
}

export default Numbers