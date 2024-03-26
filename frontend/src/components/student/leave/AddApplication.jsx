import React, { useState } from 'react'
import Input from '../../Input'
import { useSelector } from 'react-redux'
import Button from '../../Button'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function AddApplication() {
    const student = useSelector(state=>state.auth.data)
    const inputHandler = (e)=>{
        e.preventDefault()
        const {name,value} = e.target
        setLeaveData(prev=>({
            ...prev,
            [name]:value
        }))
    }
    const [leaveData,setLeaveData] = useState({
        student_id:student.student_id,reason:"",start_date:"",end_date:"",d_name:"",d_no:"",d_city:"",d_email:""
    })
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(leaveData);
        axios.post("http://localhost:8002/api/v1/students/addLeave",leaveData,{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                "role": `Bearer ${localStorage.getItem('role')}`
            }
        })
        .then(response=>response.data)
        .then(response=>{
            withReactContent(Swal).fire({
                title: "Success",
                text: "Leave uploaded successfully",
                icon: "success"
            })
            setLeaveData({
                student_id:"",reason:"",start_date:"",end_date:"",d_name:"",d_no:"",d_city:"",d_email:""
            })
        })
        .catch(err=>{
            withReactContent(Swal).fire({
                title: "Failed",
                text: "Leave upload failed",
                icon: "error"
            })
            console.log(err);
        })
        console.log('Clicked');
    }
    return (
    <div className='flex flex-col h-96 m-2 mt-0 bg-neutral-100  rounded-lg p-2 '>
        <div className='flex text-2xl p-2 items-center justify-center'>Add Application</div>
        <div className='overflow-y-auto h-96'>
            <div className='flex flex-col'>
                <div className='flex flex-row w-full'>
                    <div className='px-2 py-1 w-1/3'>Student Id: <Input className='w-full' readOnly={true} value={student.student_id} /></div>
                    <div className='px-2 py-1 w-1/3'>Student Name: <Input className='w-full' readOnly={true} value={student.student_name} /></div>
                </div>
                <div className='px-2 py-1 w-3/4'>Reason: <textarea onChange={inputHandler} name='reason' rows="4" className="block p-2.5 text-sm text-gray-900 bg-neutral-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"></textarea></div>
                <div className='flex flex-row w-full'>
                    <div className='px-2 py-1 w-1/3'>Start Date: <Input name="start_date" onChange={inputHandler} className='w-full' type='date' /></div>
                    <div className='px-2 py-1 w-1/3'>End Date: <Input name= "end_date" onChange={inputHandler} className='w-full' type='date' /></div>
                </div>
            </div>
            <div>
                <div className='flex flex-row w-full'>
                    <div className='px-2 py-1 w-1/3'>Doctor's Name: <Input name="d_name" onChange={inputHandler} className='w-full' type='text' /></div>
                    <div className='px-2 py-1 w-1/3'>Doctor's Contact No. : <Input name="d_no" onChange={inputHandler} className='w-full' type='text' /></div>
                </div>
                <div className='flex flex-row w-full'>
                    <div className='px-2 py-1 w-1/3'>Doctor's Email: <Input name="d_email" onChange={inputHandler} className='w-full' type='email' /></div>
                    <div className='px-2 py-1 w-1/3'>Doctor's City : <Input name="d_city" onChange={inputHandler} className='w-full' type='text' /></div>
                </div>
            </div>
        </div>
        
        <div className='flex flex-row justify-end'>
            <Button onClick={handleSubmit} type='submit' >
                Submit
            </Button>
        </div>
    </div>
  )
}

export default AddApplication