import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import Button from '../../Button';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';
function AdminExamTimeTable() {
    const [examTimeTableData, setExamTimeTableData] = useState([{}]) 
    useEffect(()=>{
        axios.post("http://localhost:8002/api/v1/admin/exam/viewTimeTable",{},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(result=>result.data)
        .then(result=>{
            console.log(result.data);
            setExamTimeTableData(result.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    const deleteRow = (e,exam_id)=>{
        e.preventDefault()
        axios.post("http://localhost:8002/api/v1/admin/exam/deleteFromTimeTable",{exam_id},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>{
            setExamTimeTableData(examTimeTableData.filter(data=>data.exam_id!==exam_id))
            withReactContent(Swal).fire({
                title: "Deleted",
                text: `Student Deleted successfully`,
                icon: "success"
            })
            console.log('deleted');
        })
        .catch(err=>{
            withReactContent(Swal).fire({
                title: "Failed",
                text: `Not Deleted`,
                icon: "error"
            })
            console.log(err);
        })
    }
    return (
        <div className='h-screen flex flex-col items-center bg-neutral-300'>
            <div className=' flex h-16 bg-neutral-100 mt-4 items-center text-2xl w-5/6 rounded-lg justify-center'>Exam Time Table</div>
            <div className='bg-white max-h-full w-5/6 overflow-y-auto my-4 '> 
                <div className='flex justify-center flex-row border-2 border-black'>
                    <div className='px-2 py-2 w-1/6 flex justify-center '>Date</div>
                    <div className='px-2 py-2 w-1/6 flex justify-center '>Subject</div>
                    <div className='px-2 py-2 w-1/6 flex justify-center '>Class</div>
                    <div className='px-2 py-2 w-1/6 flex justify-center '>Supervisor</div>
                    <div className='px-2 py-2 w-1/6 flex justify-center '>Examinor</div>
                    <div className='px-2 py-2 w-1/6 flex justify-center '>Category</div>
                    <div className='px-2 py-2 w-1/6 flex justify-center '>Type</div>
                    <div className='px-2 py-2 w-1/6 flex justify-center '>Total Marks</div>
                    <div className='px-2 py-2 w-2/6 flex justify-center '>{' '}</div>
                </div>
                <div className='flex flex-col bg-neutral-200 divide-y-2 border-2 border-t-0 border-black'>
                    {
                        examTimeTableData.map((item,i)=>(
                            <div key={i} className='flex flex-row '>
                                <div className='px-2 py-2 w-1/6 flex justify-center'>{item.exam_date}</div>
                                <div className='px-2 py-2 w-1/6 flex justify-center'>{item.subject}</div>
                                <div className='px-2 py-2 w-1/6 flex justify-center'>{item.class}</div>
                                <div className='px-2 py-2 w-1/6 flex justify-center'>{item.supervisor}</div>
                                <div className='px-2 py-2 w-1/6 flex justify-center'>{item.examinor}</div>
                                <div className='px-2 py-2 w-1/6 flex justify-center'>{item.category}</div>
                                <div className='px-2 py-2 w-1/6 flex justify-center'>{item.type}</div>
                                <div className='px-2 py-2 w-1/6 flex justify-center'>{item.total_marks}</div>
                                <div className='px-2 py-2 w-2/6 flex justify-center '>
                                    <Button  className='mx-2'  >Edit</Button> 
                                    <Button type='submit' onClick={(e)=>deleteRow(e,item.exam_id)} bgColor='bg-red-500'>Delete</Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Link to={'/admin/exam/addMarks'} className='fixed bottom-10 right-10 rounded-xl p-3 bg-neutral-50 flex items-center justify-center'><IoMdAdd />Add Entry</Link>
        </div>
    )
}

export default AdminExamTimeTable