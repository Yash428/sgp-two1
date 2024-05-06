import React, { useEffect, useState } from 'react'
import Button from '../../Button'
import axios from 'axios'
import Input from '../../Input'

function AddExamTimeTable() {
    const [data,setData] = useState({})
    const addEntry = (e)=>{
        axios.post("http://localhost:8002/api/v1/admin/exam/add",{
            exam_date:data.exam_date,
            subject:data.subject,
            s_class:data.s_class,
            e_cat:data.e_cat,
            supervisor:data.supervisor,
            examinor: data.examinor
        },{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    }
    const update = (e) =>{
        const {name,value} = e.target
        console.log(name+" "+value);
        setData(prev=>({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div className='h-screen flex flex-col items-center bg-neutral-300'>
            <div className=' bg-neutral-100 h-12 mt-4 w-11/12 rounded-lg flex justify-center items-center p-4 text-2xl'>Add In Exam Time Table</div>
            <div className='bg-neutral-100 w-11/12 h-96 rounded-lg mt-4'>
                <div className='flex flex-col'>
                    <div className=' flex flex-row flex-wrap grow p-2'>
                        <div className=' p-2 pb-1 pt-1 w-1/2 flex flex-row items-center'>
                            <div className='p-2 w-1/4'>Select Class</div>
                            <select value={data.s_class} className='h-10 p-2 rounded-lg w-80 bg-neutral-100'></select>
                        </div>
                        <div className='p-2 pb-1 pt-1 w-1/2 flex flex-row items-center'> 
                            <div className='p-2 w-1/4'>Select Subject </div>
                            <select value={data.subject} className='h-10 p-2 rounded-lg w-80 bg-neutral-100'></select>
                        </div>
                        <div className='p-2 pb-1 pt-1 w-1/2 flex flex-row items-center'>
                            <div className='p-2 w-1/4'>Select Date</div>
                            <Input type='date' value={data.exam_date} className='h-10 p-2 rounded-lg w-80 bg-neutral-100' />
                        </div>
                    </div>
                    <div className=' flex flex-row  flex-wrap p-2'>
                        <div className='p-2 pb-1 pt-1 w-1/2 flex flex-row items-center'>
                            <div className='p-2 w-1/4'>Select Category</div>
                            <select value={data.e_cat} className='h-10 p-2 rounded-lg w-80 bg-neutral-100'></select>
                        </div>
                        <div className='p-2 pb-1 pt-1 w-1/2 flex flex-row items-center'> 
                            <div className='p-2 w-1/4'>Select Type </div>
                            <select value={data.type} className='h-10 p-2 rounded-lg w-80 bg-neutral-100'></select>
                        </div>
                        <div className='p-2 pb-1 pt-1 w-1/2 flex flex-row items-center'>
                            <div className='p-2 w-1/4'>Select Total Marks</div>
                            <select className='h-10 p-2 rounded-lg w-80 bg-neutral-100'></select>
                        </div>
                    </div>
                    <div className=' flex flex-row  flex-wrap p-2'>
                        <div className='p-2 pb-1 pt-1 w-1/2 flex flex-row items-center'>
                            <div className='p-2 w-1/4'>Select Supervisor</div>
                            <select className='h-10 p-2 rounded-lg w-80 bg-neutral-100'></select>
                        </div>
                        <div className='p-2 pb-1 pt-1 w-1/2 flex flex-row items-center'> 
                            <div className='p-2 w-1/4'>Select Examinor </div>
                            <select className='h-10 p-2 rounded-lg w-80 bg-neutral-100'></select>
                        </div>
                    </div>
                    <div className='flex justify-end m-4'>
                        <Button type='submit' className='w-24' >Add</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddExamTimeTable