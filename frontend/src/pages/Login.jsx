import React, { useEffect, useState } from 'react'
import { Input } from '../components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {login as authLogin} from "../store/authSlice"
// import {login as roleLogin} from "../store/roleSlice"
import {useDispatch} from "react-redux"
import GetCookie from '../hooks/getCookie'
import SetCookie from '../hooks/setCookie'
import RemoveCookie from '../hooks/RemoveCookie'

function Login() {
    const [id,setId] = useState('')
    const [Password,setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     const serverCookie = cookie.get('accessToken')
    //     console.log(serverCookie);
    // },[])

    const formHandler = async (e)=>{
        e.preventDefault()
        if(id.charAt(0)==='S'){
            let userData = {
                studentId:id,
                studentPassword :Password
            }
            try {
                axios.post('http://localhost:8002/api/v1/students/login',userData)
                .then(result =>{
                    console.log(result.data.data.accessToken);
                    SetCookie('accessToken',result.data.data.accessToken)
                    // console.log(result.data.data.refreshToken);
                    console.log(result.data);
                    if(result.data.data.student.length===0){ 
                        navigate('/')
                    }
                    let studentData = result.data.data.student[0];
                    studentData = {...studentData,role:"student"}
                    dispatch(authLogin(studentData))
                    console.log(studentData);
                    // dispatch(roleLogin("student"))
                }).catch((e)=> {
                    console.log(e)
                    navigate('/')
                })
                navigate("student")
            } catch (error) {
                console.log('Login error');
            }
        }
        else if(id.charAt(0)==='T' || id.charAt(0)==='t'){
            let userData = {
                teacherId:id,
                teacherPassword:Password
            }
            try {
                axios.post('http://localhost:8002/api/v1/teachers/login',userData)
                .then(result =>{
                    console.log(result.data.data.teacher);
                    let teacherData = result.data.data.teacher
                    SetCookie('accessToken',result.data.data.accessToken)
                    if(!teacherData){
                        navigate('/')
                    }
                    teacherData = {...teacherData, role:"teacher"}
                    if(teacherData){ 
                        dispatch(authLogin(teacherData))
                        // dispatch(roleLogin("teacher"))
                    }
                })
                .catch((e)=>{
                    console.log(e);
                    navigate('/')
                })
                navigate("teacher")
            } catch (error) {
                console.log('Login error');
            }
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
                                    <Input type="text" onChange={e=>setId(e.target.value)} placeholder="Add Id"/>
                                </div>
                                <div className="mt-2">
                                    <Input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Add Password"/>
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