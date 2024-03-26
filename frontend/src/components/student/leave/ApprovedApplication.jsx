import React, {useState,useEffect} from 'react'
import Input from '../../Input'
import { useSelector } from 'react-redux'
import Button from '../../Button'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function ApprovedApplication() {
    const student = useSelector(state=>state.auth.data)
    const [leaveData,setLeaveData] = useState([{}])
    useEffect(()=>{
        axios.post("http://localhost:8002/api/v1/students/acceptedLeaves",{student_id:student.student_id},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                "role": `Bearer ${localStorage.getItem('role')}`
            }
        })
        .then(response=>response.data)
        .then(response =>{
            console.log(response.data);
            setLeaveData(response.data)
        })
    },[])
    return (
        <div className='flex flex-col h-screen m-2 mt-0 bg-neutral-100 rounded-lg p-2'>
        <div className='flex text-2xl p-2 items-center justify-center'>Approved Applications</div>
        <div className=' '>
            <div className=' m-2 border border-black mx-1'>
                <div className='head flex justify-center px-1 py-2 bg-neutral-300 items-center flex-row w-full'>
                    <div className='w-1/6 flex justify-center items-center'>Sr no</div>
                    <div className='w-1/6 flex justify-center items-center'>Application Date</div>
                    <div className='w-1/5 flex justify-center items-center'>Period</div>
                    <div className='w-1/4 flex justify-center items-center'>Reason</div>
                    <div className='w-1/6 flex justify-center items-center' >Status</div>
                </div>
                <div className='body divide-y-2 flex flex-col h-80 overflow-y-auto'>
                    {
                        leaveData.map((item,index)=>{
                            return (
                                <div key={index} className='flex justify-center items-center px-1 py-2 flex-row w-full'>
                                    <div className='w-1/6 flex justify-center items-center'>{index+1}</div>
                                    <div className='w-1/6 flex justify-center items-center'>{item.appli_date}</div>
                                    <div className='w-1/5 flex justify-center items-center'>{item.start_date} to {item.end_date}</div>
                                    <div className='w-1/4 flex justify-center items-center'>{item.reason}</div>
                                    <div className='w-1/6 flex justify-center items-center'>{item.status} </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default ApprovedApplication