import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'

function PrintAllStudents() {
    const [studentData,setStudentData] = useState([])
    const [teacherClass,setTeacherClass] = useState('')
    
    const handleForm = (e)=>{
        e.preventDefault()
        let userData = {
            teacherClass
        }
        fetch("/api/v1/teachers/students/studentList",{
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then((response)=>response.json()).then(data1=>{
                setStudentData(data1.data)
              //console.log(data1.data[0].student_id);
                console.log(data1);
        })
        console.log("clicked");
        
    }
    let p = studentData.map((student)=>{
        return(
            <tr>
                <td>{student.student_id}</td>
                <td>  {student.student_name}</td>
            </tr>
        )
    })
    return (
        <>
        <form onSubmit={handleForm}>
            <Input type="text" label = "Add class" onChange = {e=>setTeacherClass(e.target.value)} />
            <Button type='submit' >Submit</Button>
        </form>
            <table>
                <thead>
                    <td>ID</td>
                    <td>Name</td>
                </thead>
                <tbody>{p}</tbody>
            </table>
        </>
    )
}

export default PrintAllStudents