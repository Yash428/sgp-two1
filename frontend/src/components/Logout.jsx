import React from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import RemoveCookie from '../hooks/RemoveCookie'
import GetCookie from '../hooks/getCookie'

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role = useSelector((state)=>state.auth.role)
    const handleLogout = (e) =>{
        e.preventDefault()
        try {
            const accessToken = GetCookie('accessToken')
            console.log(accessToken + "uuuuu");
            axios.defaults.headers.common = {
                'Authorization' : `${accessToken}`
            }
            if(role === "student"){
                axios.post('http://localhost:8002/api/v1/students/logout')
                .then(() =>{
                    dispatch(logout())
                    RemoveCookie('accessToken')
                    console.log("logged out");
                    
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            else if(role ==="teacher"){
                axios.post('http://localhost:8002/api/v1/teachers/logout')
                .then(() =>{
                    dispatch(logout())
                    RemoveCookie('accessToken')
                    console.log("logged out");
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            else if(role ==="admin"){
                axios.post('http://localhost:8002/api/v1/admin/logout')
                .then(()=>{
                    dispatch(logout())
                    RemoveCookie('accessToken')
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