import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

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
      <h1 className=' text-orange-500 bg-orange-200 text-center text-5xl '>Hey Sgp2</h1>
      <form onSubmit={handleForm}>
        <input type='text' name='id' onChange={e=>setId(e.target.value)} placeholder='Add id' /><br />
        <input type='password' name='password' onChange={e=>setPassword(e.target.value)} placeholder='add password' /><br />
        <input type='submit' value="Login" />
      </form>
      <div>{jsondata.student_id}</div>
    </>
  )
}

export default App
