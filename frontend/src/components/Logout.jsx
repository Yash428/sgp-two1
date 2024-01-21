import React from 'react'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import axios from 'axios'

function Logout() {
    const dispatch = useDispatch()
    
    const handleLogout = (e) =>{
        e.preventDefault()
        try {
            axios.post('http://localhost:8002/api/v1/students/logout')
            .then(() =>{
                dispatch(logout())
                console.log("logged out");
                
            })
        } catch (error) {
            console.log('Login error');
        }
        console.log("clicked");
    }
    return (
        <>
            <Button onClick ={handleLogout} >Logout</Button>
        </>
    )
}

export default Logout