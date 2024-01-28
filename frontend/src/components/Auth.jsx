import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({children, authentication = true}){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state =>state.auth.status)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("")    //Sends to Login Page
        }
        else if(!authentication && authStatus !== authentication ){
            navigate("/")   //Sends to /
        }
        setLoader(false)
    },[authStatus, navigate, authentication])
    return loader ? <h1>Loading... </h1> : <>{children}</>
}