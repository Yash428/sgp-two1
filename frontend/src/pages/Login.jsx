import React, { useState } from 'react'
import { Input } from '../components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {login as authLogin} from "../store/authSlice"
import{storeStudent } from "../store/studentSlice"
import {useDispatch} from "react-redux"

function Login() {
    const [studentId,setStudentId] = useState('')
    const [studentPassword,setStudentPassword] = useState('')
    const [jsondata,setJsonData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formHandler = async (e)=>{
        e.preventDefault()
        let userData = {
            studentId,
            studentPassword
        }

        try {
            axios.post('http://localhost:8002/api/v1/students/login',userData)
            .then(result =>{
                console.log(result.data.data.student[0]);
                const studentData = result.data.data.student[0];
                if(studentData){ 
                    dispatch(authLogin(studentData))
                    dispatch(storeStudent(studentData))
                }
                navigate('/')
            })
        } catch (error) {
            console.log('Login error');
        }
        console.log("clicked");
    }

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Login</h2>
                        <form method="POST" className="mt-8">  
                            <div className="space-y-5">
                                <div className="mt-2">
                                    <Input type="text" onChange={e=>setStudentId(e.target.value)} placeholder="Add Id"/>
                                </div>
                                <div className="mt-2">
                                    <Input type="password" onChange={e=>setStudentPassword(e.target.value)} placeholder="Add Password"/>
                                </div>
                                    <button
                                    onClick={formHandler}
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