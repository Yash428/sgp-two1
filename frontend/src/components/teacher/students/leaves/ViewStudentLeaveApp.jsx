import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../../../Input'
import Button from '../../../Button'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useParams } from 'react-router-dom'

function ViewStudentLeaveApp() {
    const teacher = useSelector(state=>state.auth.data)
    const [studentLeave,setStudentLeave] = useState({})
    const {sl_id} = useParams()
    useEffect(()=>{
        axios.post("http://localhost:8002/api/v1/teachers/students/getLeaveBysl",{
            sl_id
        },{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                "role": `Bearer ${localStorage.getItem('role')}`
            }
        })
        .then(Response=>Response.data)
        .then(Response =>{
            console.log(Response.data[0]);
            setStudentLeave(Response.data[0])
        })
    },[])
    const acceptIt = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8002/api/v1/teachers/students/approveLeave",{
            sl_id
        },{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                "role": `Bearer ${localStorage.getItem('role')}`
            }
        }).then(Response=>Response.data)
        .then(Response =>{
            console.log(Response.data);
            Swal.fire({
                icon:'success',
                title: 'Leave Approved',
                text: 'You approved the application',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    const rejectIt = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8002/api/v1/teachers/students/rejectLeave",{
            sl_id
        },{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                "role": `Bearer ${localStorage.getItem('role')}`
            }
        }).then(Response=>Response.data)
        .then(Response =>{
            console.log(Response.data);
            Swal.fire({
                icon:'success',
                title: 'Leave Reject',
                text: 'You rejected the application',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
return (
    <div className='flex flex-col h-96 m-2 mt-0 bg-neutral-100  rounded-lg p-2 '>
        <div className='flex text-2xl p-2 items-center justify-center'>Add Application</div>
        <div className='overflow-y-auto h-96'>
            <div className='flex flex-col'>
                <div className='flex flex-row w-full'>
                    <div className='px-2 py-1 w-1/3'>Student Id: <Input className='w-full' readOnly={true} value={studentLeave.student_id} /></div>
                    <div className='px-2 py-1 w-1/3'>Student Name: <Input className='w-full' readOnly={true} value={studentLeave.student_name} /></div>
                </div>
                <div className='px-2 py-1 w-3/4'>Reason: <textarea readOnly={true} value={studentLeave.reason} name='reason' rows="4" className="block p-2.5 text-sm text-gray-900 bg-neutral-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"></textarea></div>
                <div className='flex flex-row w-full'>
                    <div className='px-2 py-1 w-1/3'>Start Date: <Input name="start_date" readOnly={true} value={studentLeave.start_date} className='w-full' type='date' /></div>
                    <div className='px-2 py-1 w-1/3'>End Date: <Input name= "end_date" readOnly={true} value={studentLeave.end_date} className='w-full' type='date' /></div>
                </div>
            </div>
            <div>
                <div className='flex flex-row w-full'>
                    <div className='px-2 py-1 w-1/3'>Doctor's Name: <Input name="d_name" readOnly={true} value={studentLeave.d_name} className='w-full' type='text' /></div>
                    <div className='px-2 py-1 w-1/3'>Doctor's Contact No. : <Input name="d_no" readOnly={true} value={studentLeave.d_no} className='w-full' type='text' /></div>
                </div>
                <div className='flex flex-row w-full'>
                    <div className='px-2 py-1 w-1/3'>Doctor's Email: <Input name="d_email" readOnly={true} value={studentLeave.d_email} className='w-full' type='email' /></div>
                    <div className='px-2 py-1 w-1/3'>Doctor's City : <Input name="d_city" readOnly={true} value={studentLeave.d_city} className='w-full' type='text' /></div>
                </div>
            </div>
        </div>
        
        <div className='flex flex-row justify-end'>
            <Button onClick={acceptIt} type='submit' >
                Accept
            </Button>
            <Button onClick={rejectIt} type='submit' >
                Reject
            </Button>
        </div>
    </div>
  )
}

export default ViewStudentLeaveApp