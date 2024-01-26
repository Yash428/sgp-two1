import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input,Button } from '../components'
import axios from "axios"
import authSlice, {logout as authLogout} from "../store/authSlice"
import {useDispatch, useSelector} from "react-redux"
import Logout from '../components/Logout'
import TimeTable from '../components/student/TimeTable'
import AttendanceSummary from '../components/student/AttendanceSummary'


function PageOne() {
    const [data,setData] = useState([])
    const dispatch = useDispatch()
    const selector = useSelector((state)=>state.auth.data)
    //console.log(selector);
    const formHandler = async (e)=>{
        e.preventDefault()
        const studentClass = selector.student_class
        // setStudentClass('9-A')
        //console.log(selector);
        axios.post('http://localhost:8002/api/v1/students/timetable',{studentClass:studentClass})
        .then(result =>{
            console.log(result.data.data); 
            setData(result.data.data)
        })
        .catch(error=>{
            console.log(error);
        })
        console.log("clicked");
    }
    // const handleLogout = async()=>{
    //     dispatch(authLogout())
    // }
    let printIt = data.map((t)=>{
        return(
            <tr>
                <td>{t.lec_start_time} - {t.lec_end_time}</td>
                <td>{t.sub_id}</td>
                <td>{t.teacher_name}</td>
            </tr>
        )
    })
    const headers = ['time','sub_id','teacher_name']
    return (
        <>
        <div className='text-3xl'>Successfull</div>
        <form onSubmit={formHandler} >
            {/* <Input label="Class" onChange ={e=>setStudentClass(e.target.value)} /> */}
            <Button type='submit'>Find</Button>
        </form>

        <TimeTable />
        {/* <table>
            <thead className="bg-gray-50">
                {headers}
            </thead>
            <tbody>{printIt}</tbody>
        </table> */}
        <AttendanceSummary />
        <Logout />
        </>
        
    )
}

export default PageOne