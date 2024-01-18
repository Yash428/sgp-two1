import React, { useState } from 'react'
import { Input } from '../components'

function Login() {
    const [studentId,setStudentId] = useState('')
    const [studentPassword,setStudentPassword] = useState('')
    const [jsondata,setJsonData] = useState({})

    const formHandler = (e)=>{
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
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Login</h2>

                <form onSubmit={formHandler} method="POST" className="mt-8">  
                    <div className="space-y-5">
                        <div className="mt-2">
                            <Input type="text" onChange={e=>setStudentId(e.target.value)} placeholder="Add Id"/>
                        </div>
                        <div className="mt-2">
                            <Input type="password" onChange={e=>setStudentPassword(e.target.value)} placeholder="Add Password"/>
                        </div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                            >Submit</button>
                    </div>
                </form>
            </div>
            </div>
            </div>
        </section>
    )
}

export default Login