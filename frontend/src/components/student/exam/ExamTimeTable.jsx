import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

function ExamTimeTable() {
    const [timeTableData,setTimeTableData] = useState([{}])
    const [errorMessage,setErrorMessage] = useState('')
    const student = useSelector(state=>state.auth.data)
    useEffect(()=>{
        axios.post("http://localhost:8002/api/v1/students/examTimeTable",{student_class:student.student_class},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>result.data)
        .then(result => {
            console.log(result.data);
            setTimeTableData(result.data)
            setErrorMessage('')
        })
        .catch(err=>{
            console.log(err);
            console.log(err.response.status);
            if(err.response.status===400){
                setErrorMessage('There are no upcoming Exams')
            }
        })
    },[])
    return (
        <div className='flex justify-center items-center flex-col'>
            <div className='text-2xl text-center  mt-5 p-4  w-2/3 bg-neutral-100'>Exam Time Table</div>
            <div className='flex ml-10 bg-neutral-100 mt-10 flex-row w-5/6 items-center border-2 border-black justify-center'>
                {
                    errorMessage === 'There are no upcoming Exams'?(<div className=' bg-red-400 text-2xl'>{errorMessage}</div>):(
                    <div className='w-full  '>
                        <div className='w-full flex flex-row items-center justify-center bg-neutral-300 '>
                            <div className='p-2 flex justify-center w-1/3'>Exam Date</div>
                            <div className='p-2 flex justify-center w-1/4'>Subject</div>
                            <div className='p-2 flex justify-center w-1/3'>Type</div>
                            <div className='p-2 flex justify-center w-1/3'>Category</div>
                        </div>
                        <div className=' overflow-y-auto h-48 bg-neutral-100 divide-y-2'>
                        {
                            timeTableData.map((item,i)=>{
                                return(
                                    <div key={i} className='w-full flex flex-row items-center justify-center ' >
                                        <div className='p-2 flex justify-center w-1/3'>{item.exam_date}</div>
                                        <div className='p-2 flex justify-center w-1/4'>{item.subject}</div>
                                        <div className='p-2 flex justify-center w-1/3'>{item.type}</div>
                                        <div className='p-2 flex justify-center w-1/3'>{item.category}</div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default ExamTimeTable