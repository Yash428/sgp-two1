import React from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role = useSelector((state)=>state.auth.role)
    const handleLogout = (e) =>{
        e.preventDefault()
        try {
            if(role === "student"){
                axios.post('http://localhost:8002/api/v1/students/logout',{},{
                    headers:{
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                .then(() =>{
                    dispatch(logout())
                    
                    console.log("logged out");
                    
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            else if(role ==="teacher"){
                axios.post('http://localhost:8002/api/v1/teachers/logout',{},{
                    headers:{
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                .then(() =>{
                    dispatch(logout())
                    
                    console.log("logged out");
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            else if(role ==="admin"){
                axios.post('http://localhost:8002/api/v1/admin/logout',{},{
                    headers:{
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                .then(()=>{
                    dispatch(logout())
                    
                    console.log("logged out");
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            navigate("/")
        } catch (error) {
            console.log('Logout error');
        }
        console.log("clicked");
    }
    return (
        <>
            <button onClick ={handleLogout} >Logout</button>
        </>
    )
}

export default Logout