import React, { useState } from 'react'
import Input from '../../Input'
import Button from '../../Button'
import { useSelector } from 'react-redux'
import axios from 'axios'


function SetPassword() {
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const selector = useSelector((state)=>state.auth.data)
    const studentId = selector.student_id
    const [message, setMessage] = useState('')
    const [color,setColor] = useState({
        bgColor:'',
        borderColor: ''
    })

    const changePassword = async (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8002/api/v1/students/updatePassword',{studentId,oldPassword,newPassword},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(result=>{
                console.log(result.data.message);
                setMessage(result.data.data.message)
                if(result.data.data.message === "Password changed Successfully"){
                    setColor((prev)=>(
                        {
                            ...prev,
                            bgColor:'bg-green-200',
                            borderColor:'border-green-700'
                        }
                    ))
                }
                else{
                    setColor((prev)=>(
                        {
                            ...prev,
                            bgColor:'bg-red-200',
                            borderColor:'border-red-700'
                        }
                    ))
                }
            })
            .catch(error=>{
                console.log(error);
                setMessage('Failed to change password')
                setColor((prev)=>(
                    {
                        ...prev,
                        bgColor:'bg-red-200',
                        borderColor:'border-red-700'
                    }
                ))
            })
    }
    return (
        <section  className=' rounded-lg relative mx-auto bg-gray-100 my-4 flex max-w-xl px-4 py-4 w-2/3 justify-center flex-col'>
            <div className='text-xl text-blue-700 relative items-center'>Set Password</div>
            <form onSubmit={changePassword} className='mt-4 flex flex-col p-3'>
                <Input placeholder={'Add Old Password'} onChange={e=>setOldPassword(e.target.value)} type='password' className='m-2 my-2 w-full' />
                <Input placeholder={'Add New Password'} onChange={e=>setNewPassword(e.target.value)} type='password'className='m-2 my-2 w-full' />
                <Button type='submit' className='m-2 my-2 w-full' >Submit</Button>
            </form>
            {message?<div className={`${color.bgColor} p-2 rounded-lg border ${color.borderColor}`}>
                {message}
            </div>:null}
            
        </section>
    )
}

export default SetPassword