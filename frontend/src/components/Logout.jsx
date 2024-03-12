import React from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role = useSelector((state)=>state.auth.role)
    
    const handleLogout = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8002/api/v1/logout',{},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                "role": `Bearer ${localStorage.getItem("role")}`
            }
        }).then(() =>{
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
                title: "logged out successfully",
            });
            localStorage.removeItem("accessToken")
            localStorage.removeItem("role")
            dispatch(logout())
            navigate('/')
            console.log("logged out");
        })
        .catch((error)=>{
            console.log(error);
        })
        console.log("clicked");
    }
    return (
        <>
            <button onClick ={handleLogout} >Logout</button>
        </>
    )
}

export default Logout