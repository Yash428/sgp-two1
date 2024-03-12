import React,{useState} from 'react'
import Input from "../../Input.jsx"
import FileInput from '../../FileInput.jsx'
import Button from '../../Button.jsx'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
function AddProfilePicture() {
  const [profileImg,setProfileImg] = useState('')
  const handleImage = (e)=>{
    console.log(e.target.files[0]);
    setProfileImg(e.target.files[0])
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    let data = new FormData()
    data.append('profileImage',profileImg)
    axios.post('http://localhost:8002/api/v1/students/addProfilePicture',data,{
        headers:{
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
    })
    .then(result=>{
      toast.success('Successfully')
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className='p-4 m-2 h-screen flex flex-col bg-neutral-100 rounded-lg'>
        <span className='text-xl m-2' >Add profile Picture</span>
        <div className='flex flex-row mt-4'>
          <div className='p-2 w-1/2'>
            <FileInput onChange={handleImage} />
          </div>
          <div className='flex items-center'>
            <Button onClick={handleSubmit} >
              Submit
            </Button>
          </div>
        </div>
        <ToastContainer />
        
    </div>
  )
}

export default AddProfilePicture