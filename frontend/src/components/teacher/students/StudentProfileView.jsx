import React, { useEffect, useState } from 'react'
import {Button, Input} from '../../../components'
import { FaPlus } from "react-icons/fa6";
import axios from "axios"
import { useParams } from 'react-router-dom';
import blankProImg from '../../../assets/blankProImg.png'

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
function StudentProfileView() {
    
    const {student_id} = useParams()
    const [student,setStudent] = useState([{}])
    
    useEffect(()=>{
        axios.post("http://localhost:8002/api/v1/teachers/students/getStudentData",{student_id})
        .then(result=>{
            console.log(result.data.data);
            setStudent(result.data.data[0])
            console.log(student);
        })
        .catch(error=>{
            console.log(error);
        })
    },[])

    return (
        <div className=' '>
            <div className='bg-neutral-100 h-12 mt-4 -px-4 rounded-lg flex justify-center items-center p-4' >
                <span className='p-4 text-2xl '>Student Profile</span>
            </div>
            <form className='overflow-y-scroll md:px-6 lg:px-8 align-middle bg-neutral-100 flex flex-col h-128 mt-4 rounded-lg'>
                <div className=''>
                    <div className='flex flex-row  p-3'>
                        <span className='p-2 text-xl'>Student Details </span>
                    </div>
                    <div className='flex justify-end m-4 px-4 py-1'> 
                    <img  className='w-28 h-36 m-8 my-0 border rounded-lg border-black' src={student?.profile_picture || blankProImg} />
                        </div>
                    <div className='overflow-y-auto h-96 flex flex-col flex-wrap grow'>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Name: </span>
                            <Input className='h-8  w-80' name="student_name" value={student.student_name} readOnly={true} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Mobile No. : </span>
                            <Input className='h-8  w-80 ' name="student_mobile" value={student.student_mobile} readOnly={true} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Email id : </span>
                            <Input name="student_email" value={student.student_email} readOnly={true} className='h-8 w-80 shrink-0' type='email' required/>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Gender : </span>
                            <select name="student_gender" value={student.student_gender} readOnly={true} className='h-10 p-2 rounded-lg w-80 bg-neutral-100' required>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Class: </span>
                            <Input className='h-8 w-80' name="student_class" readOnly={true} value={student.student_class}  required/>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Date of Birth: </span>
                            <Input className='h-8 w-80' name="student_dob" readOnly={true} value={student.student_dob}  type='date' required/>
                        </div>
                        
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Adhar card No. : </span>
                            <Input className='h-8 w-80' name="student_adhar" readOnly={true} value={student.student_adhar}  required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Religion : </span>
                            <Input className='h-8 w-80' name="student_relegion" readOnly={true} value={student.student_relegion}  required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Caste: </span>
                            <select name="student_caste"  value={student.student_caste} readOnly={true} className='h-10 p-2 rounded-lg w-80 bg-neutral-100' required>
                                <option value="">Select</option>
                                <option value="open">General</option>
                                <option value="ews">EWS</option>
                                <option value="obc">OBC</option>
                                <option value="sc">SC</option>
                                <option value="st">ST</option>
                            </select>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Subcaste: </span>
                            <Input className='h-8 w-80' name="student_subcaste" readOnly={true} value={student.student_subcaste}  required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Mother tongue: </span>
                            <Input className='h-8 w-80' name = "student_m_tounge" readOnly={true}  value={student.student_m_tounge} required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4'>Blood group: </span>
                            <select name="student_bgroup" value={student.student_bgroup} readOnly={true}  className='h-10 p-2 rounded-lg w-80 bg-neutral-100' required>
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
                            <textarea value={student.student_address}  readOnly={true} name='student_address' id="message" rows="4" className="block p-2.5 text-sm text-gray-900 bg-neutral-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-80" required ></textarea>
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
                            <Input className='h-8 w-80' name="father_name" readOnly={true} value={student.father_name}  required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Father No. : </span>
                            <Input className='h-8 w-80' name="father_no" readOnly={true} value={student.father_no}  required />
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1 '>
                            <span className='p-2 w-1/4'>Mother Name: </span>
                            <Input className='h-8 w-80' name="mother_name" readOnly={true} value={student.mother_name}  required/>
                        </div>
                        <div className='flex flex-row w-1/2 p-2 pb-1 pt-1'>
                            <span className='p-2 w-1/4' >Mother No. : </span>
                            <Input className='h-8 w-80' name="mother_no" readOnly={true} value={student.mother_no} required/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StudentProfileView