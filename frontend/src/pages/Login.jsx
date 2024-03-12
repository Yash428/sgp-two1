import React, {useState } from 'react'
import { Input } from '../components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {login as authLogin} from "../store/authSlice"
import {useDispatch} from "react-redux"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Login() {
    const [id,setId] = useState('')
    const [Password,setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8002/api/v1/login',{
            id:id,
            password:Password
        })
        .then(result =>result.data)
        .then(result =>{
            const user = result.data.user;
            console.log(result.data.user);
            const role = result.data.user.role;
            console.log(role);
            localStorage.setItem('accessToken',result.data.accessToken)
            localStorage.setItem('role',role)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
            });
            dispatch(authLogin(user))
            navigate(`/${role}`)
        })
        .catch(err=>{
            withReactContent(Swal).fire({
                icon: "error",
                title: "Oops...",
                text: "Your id or Password is incorrect",
            });
        })
    }
    return (
        <section className='bg-neutral-100 w-full h-screen' >
            
                <div className="flex flex-row px-4 py-10 sm:px-6 sm:py-16 lg:px-8  lg:py-24">
                    <div className="xl:mx-auto flex h-4/5 flex-col justify-end xl:w-full p-4 rounded-lg bg-neutral-200 xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl flex justify-center font-bold leading-tight text-black dark:text-white sm:text-4xl">Login</h2>
                        <form  className="mt-8">  
                            <div className="space-y-5">
                                <div className="mt-2">
                                    <Input type="text" className='w-full' required onChange={e=>{setId(e.target.value); console.log(e.target.value);}} placeholder="Add Id"/>
                                </div>
                                <div className="mt-2">
                                    <Input type="password" className='w-full' required onChange={e=>{setPassword(e.target.value); console.log(e.target.value);}} placeholder="Add Password"/>
                                </div>
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black mt-6 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
    )
}

export default Login