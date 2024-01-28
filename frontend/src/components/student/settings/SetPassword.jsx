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

    const changePassword = async (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8002/api/v1/students/updatePassword',{studentId,oldPassword,newPassword})
            .then(result=>{
                console.log(result.data.message);
                setMessage(result.data.data.message)
            })
            .catch(error=>{
                console.log(error);
            })
    }
    return (
        <section  className=' rounded-lg relative mx-auto bg-gray-100 flex max-w-xl px-4 py-4 justify-center flex-col'>
            <div className='text-xl text-blue-700 relative items-center'>Set Password</div>
            <form onSubmit={changePassword} className=' '>
                <Input label={'Add Old Password'} onChange={e=>setOldPassword(e.target.value)} type='password' className='m-2' />
                <Input label={'Add New Password'} onChange={e=>setNewPassword(e.target.value)} type='password'className='m-2' />
                <Button type='submit' >Submit</Button>
            </form>
            {message}
        </section>
    )
}

export default SetPassword