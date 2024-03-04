import { IoEye } from "react-icons/io5";
import { MdDelete, MdEdit} from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button'
import axios from 'axios'
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import * as XLSX from 'xlsx';
import { FaFilePdf } from "react-icons/fa6";
import React, { useEffect,useState, useId } from 'react'
import { useSelector } from 'react-redux'
import { usePDF,Margin } from 'react-to-pdf'
import {getExcel} from '../../../Excel/index.js'


function StudentAttendanceReport() {
  const [studentList,setStudentList] = useState([])
    const [studentClass,setStudentClass] = useState('')
    const [studentClassList,setStudentClassList] = useState([])
    const [isSelected,setIsSelected] = useState(false)
    const adminId = useSelector(state =>state.auth.data.admin_id)
    const navigate = useNavigate()
    const headers = [
        {header:'Student Id',key:'student_id',width:10,height:20},
        {header: 'Student Name',key:'student_name',width:30,height:20},
        {header: 'Student Class',key:'student_class',width:14,height:20},
        {header: 'Attendance',key:'attendance',width:11,height:20}
    ]
    useEffect(()=>{
        axios.post('http://localhost:8002/api/v1/admin/student/getClass')
        .then(result=>{
            console.log(result.data.data);
            setStudentClassList(result.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    const { toPDF, targetRef } = usePDF({
        method: "save",
        filename: `${studentClass}-Attendance.pdf`,
        page: { margin: Margin.LARGE },
        
    });
    const printExcel = (e)=>{
        axios.post("http://localhost:8002/api/v1/admin/generateExcel",{
            data:studentList,
            bookName:'Attendance',
            creatorId:adminId,
            headers
        },{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>{
            console.log(result.data);
        })
        // getExcel({data:studentList,bookName:'Attendance',creatorId:adminId})
        // console.log(studentList);
        // const wRows = [
        //     {width: 15},
        //     {width:30},
        //     {width:15},
        //     {width:15}
        // ]
        // const headerStyle = {
        //     font: { bold: true },
        //     alignment: { vertical: 'middle', horizontal: 'center' }
        // }
        // const workSheet = XLSX.utils.json_to_sheet(studentList)
        // workSheet["!cols"] = wRows
        
        // const workBook = XLSX.utils.book_new()
        // XLSX.utils.book_append_sheet(workBook,workSheet,'Sheet 1')
        // workSheet['!rows'] = [headerStyle];
        // XLSX.writeFile(workBook, `${studentClass}List.xlsx`)
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8002/api/v1/admin/student/getAttendanceByClass',{
            studentClass
        })
        .then(response=>{
            setIsSelected(prev=>!prev.isSelected)
            console.log(response.data.data)
            setStudentList(response.data.data)
        })
        .catch(error=>{
            console.log(error);
        })
    }
    
    const LinkCss= "px-4 py-2 rounded-lg text-white"
    return (
        <div className='h-screen bg-neutral-200'>
        <div className=' h-16 bg-neutral-100 m-4 my-2 rounded-lg min-w-96 flex items-center sticky'>
            <div><span className='px-4 py-2 text-2xl '> Student Attendance List </span></div>
            <form onSubmit={onSubmit} className='flex'>
                <select name="" id="studentClass" className='h-10 p-2 mx-3 rounded-lg w-80 bg-neutral-100' value={studentClass}  onChange={(e)=>setStudentClass(e.target.value)}>
                    <option key={0} value="">Select Class</option>
                    {
                        studentClassList.map((item)=>(
                            <option key={item.sr_no} value={item.class_no}>{item.class_no}</option>
                        ))
                    }
                </select>
                <Button type='submit' >Submit</Button>
            </form>
            {
                isSelected?(<div className='flex flex-row m-1'>
                <Button onClick={printExcel} type='submit' className='flex flex-row items-center h-10 mx-2' bgColor='bg-green-500'><PiMicrosoftExcelLogoFill /> Export as Excel</Button>
                <Button type='submit' onClick={toPDF} className='flex flex-row items-center h-10 mx-2' bgColor='bg-red-500'><FaFilePdf />Export as Pdf</Button>
                </div>
                ):(null)
            }
        </div>
        <div ref={targetRef} className='overflow-y-scroll h-5/6'>
            <div className=" overflow-auto min-w-full  py-2 align-middle md:px-6 lg:px-8">
                <div className="border border-gray-200 md:rounded-lg">
                    <table className="w-full divide-y h-full divide-gray-200">
                        <thead className="bg-gray-50 flex ">
                            <tr className='flex w-full sticky 0'>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-sm font-normal text-gray-700 w-1/4"
                                >
                                    <span>Id</span>
                                </th>
                                <th
                                    scope="col"
                                    className="px-12 py-3 text-center text-sm font-normal text-gray-700  w-1/4"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-sm font-normal text-gray-700  w-1/4"
                                >
                                    Class
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-sm font-normal text-gray-700  w-1/4"
                                >
                                Attendance
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y flex flex-col divide-gray-200 w-full items-center justify-center bg-white overflow-y-scroll">
                            {
                            studentList.map((item) => (
                                <tr key={item.student_id} className='w-full flex'>
                                    <td className="whitespace-nowrap px-4 py-4 w-1/4">
                                        <div className="ml-4">
                                            <div className="text-sm text-center font-medium text-gray-900">{item.student_id}</div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-12 py-4 w-1/4">
                                        <div className="text-sm text-center text-gray-900 "> {item.student_name} </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium w-1/4">
                                        <div className="text-sm text-center text-gray-900 ">{item.student_class}</div>
                                    </td>
                                    
                                    <td className="whitespace-nowrap flex flex-row items-center justify-center text-center text-sm font-medium w-1/4">
                                        {item.attendance}%
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}

export default StudentAttendanceReport