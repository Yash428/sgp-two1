import React, { useState } from 'react'
import {Button, Input} from '../../../components'
import { FaPlus } from "react-icons/fa6";
import axios from "axios"
export const CurrDate = ()=>{
    const date = new Date()
    //console.log(date);
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const currentDate = year+'-'+month+'-'+day
    //console.log(currentDate);
    return currentDate
}
function AddStudent() {
    const studentData = {
        student_id:"",
        student_name:"",
        student_mobile:"",
        student_email:"",
        student_address:"",
        student_gender:"",
        student_class:"",
        student_dob:"",
        student_password:"",
        parent_id: "",
        student_adhar:"",
        student_relegion:"",
        student_caste:"",
        student_subcaste:"",
        student_m_tounge:"",
        student_bgroup:"",
        student_join_date: CurrDate(),
        father_name:"",
        father_no:"",
        mother_name:"",
        mother_no:""
    }
    const [student,setStudent] = useState(studentData)
    const onSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8002/api/v1/admin/student/addStudent",student)
        .then(result=>{
            console.log(result);
        })
        .catch(error=>{
            console.log(error);
        })
    }
    const update =  (e)=>{
        //e.preventDefault()
        const {name,value} = e.target
        console.log(name+" "+value);
        setStudent(prev=>({
            ...prev,
            [name]: value
        }))
        console.log(student);
    }
    return (
        <div className=' '>
            <div className='bg-neutral-100 h-12 mt-4 -px-4 rounded-lg flex justify-center items-center p-4' >
                <span className='p-4 text-2xl '>Add Student</span>
            </div>
            <form onSubmit = {onSubmit}className='overflow-y-scroll bg-neutral-100 flex flex-col h-128 mt-4 rounded-lg'>
                <div className=''>
                    <div className='flex flex-row  p-3'>
                        <span className='p-2 text-xl'>Student Details </span>
                    </div>
                    <div className='overflow-y-auto max-h-96 flex flex-col flex-wrap grow'>
                        <div className='flex flex-row  p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Name: </span>
                            <Input className='h-8  w-80' name="student_name" value={student.student_name} onChange={update} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Mobile No. : </span>
                            <Input className='h-8  w-80 ' name="student_mobile" value={student.student_mobile} onChange={update} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Email id : </span>
                            <Input name="student_email" value={student.student_email} onChange={update} className='h-8 w-80 shrink-0' type='email' required/>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Gender : </span>
                            <select name="student_gender" onChange={update} value={student.student_gender} className='h-10 p-2 rounded-lg w-80 bg-neutral-100' required>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Class: </span>
                            <Input className='h-8 w-80' name="student_class" value={student.student_class} onChange={update} required/>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Date of Birth: </span>
                            <Input className='h-8 w-80' name="student_dob" value={student.student_dob} onChange={update} type='date' required/>
                        </div>
                        
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Adhar card No. : </span>
                            <Input className='h-8 w-80' name="student_adhar" value={student.student_adhar} onChange={update} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Religion : </span>
                            <Input className='h-8 w-80' name="student_relegion" value={student.student_relegion} onChange={update} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Caste: </span>
                            <select name="student_caste" onChange={update} value={student.student_caste} className='h-10 p-2 rounded-lg w-80 bg-neutral-100' required>
                                <option value="">Select</option>
                                <option value="general">General</option>
                                <option value="ews">EWS</option>
                                <option value="obc">OBC</option>
                                <option value="sc">SC</option>
                                <option value="st">ST</option>
                            </select>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Subcaste: </span>
                            <Input className='h-8 w-80' name="student_subcaste" value={student.student_subcaste} onChange={update} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Mother tongue: </span>
                            <Input className='h-8 w-80' name = "student_m_tounge" onChange={update} value={student.student_m_tounge} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Blood group: </span>
                            <select name="student_bgroup" value={student.student_bgroup} onChange={update} className='h-10 p-2 rounded-lg w-80 bg-neutral-100' required>
                                <option value="">Select</option>
                                <option value="o+">O+</option>
                                <option value="o-">O-</option>
                                <option value="a+">A+</option>
                                <option value="a-">A-</option>
                                <option value="b+">B+</option>
                                <option value="b-">B-</option>
                                <option value="ab+">AB+</option>
                                <option value="ab-">AB-</option>
                            </select>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Address: </span>
                            <textarea value={student.student_address} onChange={update} name='student_address' id="message" rows="4" className="block p-2.5 text-sm text-gray-900 bg-neutral-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-80" required ></textarea>
                        </div>
                    </div>
                </div>

                <div className=''>
                    <div className='flex flex-row w-1/2 p-3'>
                        <span className='p-2 text-xl'>Parent Details </span>
                    </div>
                    <div className='overflow-y-auto  flex flex-row flex-wrap '>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1 '>
                            <span className='p-2 w-1/4'>Father Name: </span>
                            <Input className='h-8 w-80' name="father_name" value={student.father_name} onChange={update} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Father No. : </span>
                            <Input className='h-8 w-80' name="father_no" value={student.father_no} onChange={update} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1 '>
                            <span className='p-2 w-1/4'>Mother Name: </span>
                            <Input className='h-8 w-80' name="mother_name" value={student.mother_name} onChange={update} required/>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Mother No. : </span>
                            <Input className='h-8 w-80' name="mother_no" value={student.mother_no} onChange={update} required/>
                        </div>
                    </div>
                </div>
                <div className=' m-4 ml-auto mr-4 '>
                    <Button type='submit'  className='flex flex-row items-center'><FaPlus className='pr-1'/>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default AddStudent