import { useEffect, useState } from 'react'
import {Button, Input} from "./components"
import './App.css'
import PrintAllStudents from './components/PrintAllStudents'
import AllStudentPassword from './components/AllStudentPassword'
import { TableOne } from './components/TableOne'
import Login from './pages/Login'

function App() {
  const [studentId,setId] = useState('')
  const [studentPassword,setPassword] = useState('')
  const [jsondata, setJsonData] = useState({})
  const handleForm = (e)=>{
    e.preventDefault()
    let userData = {
      studentId,
      studentPassword
    }
    fetch("/api/v1/students/login",{
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then((response)=>response.json()).then(data1=>{
        setJsonData(data1.data[0])
        //console.log(data1.data[0].student_id);
      console.log(data1);
    })
    console.log("clicked");
  }

  return (
    <>
      {/* <form onSubmit={handleForm} className='w-half '>
        <Input label="Add id: " onChange={e=>setId(e.target.value)}/>
        <Input label="Add password: " onChange={e=>setPassword(e.target.value)} type="password"/>
        {/* <input type='submit' value="Login" /> */}
        {/* <Button type='submit'>Submit</Button>
      </form> 
      <div>{jsondata.student_id}</div> */}
      {/* <AllStudentPassword /> */}
      <Login />
    </>
  )
}

export default App
