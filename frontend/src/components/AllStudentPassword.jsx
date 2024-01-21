import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'

function AllStudentPassword() {
    const [studentData,setStudentData] = useState([])
    const [teacherClass,setTeacherClass] = useState('')
    const [password,setPassword] = useState('')
    const passwordShow = ()=>{
        if(password === "password"){
            setPassword("text")
        }
        else{
            setPassword("password")
        }
    }

    const handleForm = (e)=>{
        e.preventDefault()
        let userData = {
            teacherClass
        }
        fetch("y/teachers/students/password",{
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
    let p = <tr><td>Nothing is there</td></tr> 
    if(studentData.length !==0){
        p = studentData.map((student,i)=>{
            return(
                <tr id={i} className=' text-center '>
                    <td>{student.student_id}</td>
                    <td>{student.student_name}</td>
                    <td><Input type= {password} value={student.student_password} readOnly /></td>
                    <td onClick={passwordShow}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABkklEQVR4nO2WvUoDQRSFPwsjoomk8wHEUpNgL9aKnVjYii/hT2FEIwgS8hBKgp1gY6ddYpGHWPNjKRKrRAZuYBj3zu5iRIs9cJs7557D3Duzs5AixT/AGlAGHoEOMJDoSO4UKE3ScBt4AUYxowls/cRwGXhIYOjGPbCU1HQX+AgR6wGHQAGYkygCR7Lm8t+BnTiGU8A5MAwRqQNZT61Za4TUGa0z0VZNa0rb6r5CRyPMfARUNY0rpaAXsVMXOaCvaF265APPITEztZERgVcgACqSs3Hs0dsfk1aBTw/RrNuohHBMzkbRozcAVgypFXEt3DYHIRyTs5GN0GwZUvsXjHMRmm1D2lCuzzgKMVp9kaDVQ2B9TKx6iObjYCMj5oHncJ149K5dsecJXacF4E3RegKm3YK8Z96NBB+QO89c81rhorwumnkuYqeaaVO0vZgFbhWBvnwczLs7L1GSmWrtvRHNWDAt21OuTtwIRCPOiL4hKy+LthutK+WEB1LFDLApr5c5/V3r16cruZpwDDdFCv4MXw/YJO5+W1zLAAAAAElFTkSuQmCC"/>
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
        <form onSubmit={handleForm}>
            <Input type="text" label = "Add class" onChange = {e=>setTeacherClass(e.target.value)} />
            <Button type='submit' >Submit</Button>
        </form>
            <table>
                <thead className='text-center '>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Password</td>
                        <td>Show</td>
                    </tr>
                </thead>
                <tbody>{p}</tbody>
            </table>
        </>
    )
}

export default AllStudentPassword