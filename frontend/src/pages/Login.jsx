import React, { useEffect, useState } from 'react'
import { Input } from '../components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import loginBG from '../assets/loginBG.jpg'
import {login as authLogin} from "../store/authSlice"
import {logout as authLogout} from "../store/authSlice"
import {useDispatch} from "react-redux"
import Error from '../components/alerts/Error'

function Login() {
    const [id,setId] = useState('')
    const [Password,setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoginError,setIsLoginError] = useState(false)

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
                    if(result.data.data.student.length===0){ 
                        navigate('/')
                    }
                    let studentData = result.data.data.student[0];
                    const accessToken = result.data.data.accessToken;
                    localStorage.setItem('accessToken',accessToken)
                    studentData = {...studentData,role:"student"}
                    dispatch(authLogin(studentData))
                }).catch((e)=> {
                    console.log(e)
                    console.log(e.response.data);
                    localStorage.setItem('isLoginError',true)
                    navigate('/')
                })
                localStorage.setItem('isLoginError',false)
                navigate("student")
            } catch (error) {
                console.log('Login error');
                navigate('/')
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
                    let teacherData = result.data.data.teacher
                    const accessToken = result.data.data.accessToken;
                    localStorage.setItem('accessToken',accessToken)
                    if(!teacherData){
                        navigate('/')
                    }
                    teacherData = {...teacherData, role:"teacher",accessToken:accessToken}
                    if(teacherData){ 
                        dispatch(authLogin(teacherData))
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
        else if(id.charAt(0)==='A' || id.charAt(0)==='a'){
            let userData = {
                adminId:id,
                adminPassword:Password
            }
            try {
                axios.post('http://localhost:8002/api/v1/admin/login',userData)
                .then(result =>{
                    console.log(result.data.data);
                    console.log(result.data.data.admin);
                    let adminData = result.data.data.admin
                    const accessToken = result.data.data.accessToken;
                    console.log(accessToken);
                    localStorage.setItem('accessToken',accessToken)
                    if(!adminData){
                        navigate('/')
                    }
                    adminData = {...adminData, role:"admin"}
                    if(adminData){ 
                        dispatch(authLogin(adminData))
                    }
                })
                .catch((e)=>{
                    console.log(e);
                    navigate('/')
                })
                navigate("admin")
            } catch (error) {
                console.log('Login error');
            }
        }
        else if(id.charAt(0)==='P' || id.charAt(0)==='p'){
            let userData = {
                parentId:id,
                parentPassword:Password
            }
        }
    }
    return (
        <section className='bg-neutral-100 w-full h-screen' >
            
                <div className="flex flex-row px-4 py-10 sm:px-6 sm:py-16 lg:px-8  lg:py-24">
                    <div className="xl:mx-auto flex h-4/5 flex-col justify-end xl:w-full p-4 rounded-lg bg-neutral-200 xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl flex justify-center font-bold leading-tight text-black dark:text-white sm:text-4xl">Login</h2>
                        <form method="POST" className="mt-8">  
                            <div className="space-y-5">
                                <div className="mt-2">
                                    <Input type="text" className='w-full' required onChange={e=>setId(e.target.value)} placeholder="Add Id"/>
                                </div>
                                <div className="mt-2">
                                    <Input type="password" className='w-full' required onChange={e=>setPassword(e.target.value)} placeholder="Add Password"/>
                                </div>
                                    <button
                                    onClick={formHandler}
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black mt-6 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                {isLoginError? <Error message={'login Error'} description={'invalid username or password'} buttonName={'Ok'} />:null}
            </section>
    )
}

export default Login