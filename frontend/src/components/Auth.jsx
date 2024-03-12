import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({children, authentication = true}){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state =>state.auth.status)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        
        if(localStorage.getItem('accessToken')===null){
            console.log("Authentication error");
            navigate("/login")
        }
        setLoader(false)
    },[navigate,authentication,authStatus])
    return loader ? <h1>Loading... </h1> : <>{children}</>
}