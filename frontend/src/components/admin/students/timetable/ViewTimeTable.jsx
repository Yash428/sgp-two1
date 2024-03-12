import React,{useState,useEffect} from 'react'
import Button from '../../../Button'
import axios from 'axios'

function ViewTimeTable() {
    const [studentClass,setStudentClass] = useState('')
    const [studentClassList,setStudentClassList] = useState([])
    const [studentTimeTableData,setStudentTimeTableData] = useState([])
    const weekDays =  ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY']
    const [bgColor,setBgColor] = useState('')
    useEffect(()=>{
        axios.post('http://localhost:8002/api/v1/admin/student/getClass')
        .then(result=>{
            console.log(result.data.data);
            setStudentClassList(result.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8002/api/v1/admin/student/timeTableByClass',{
            studentClass
        },{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(result=>result.data.data)
        .then(data=>{
            console.log(data);
            setStudentTimeTableData(data)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
  return (
    <div className='h-screen bg-neutral-300'>
        <div className='bg-neutral-100 flex flex-col  m-2  rounded-lg px-2 py-4 '>
            <div className='text-2xl flex items-center justify-center'>
                View Time Table
            </div>
            <div className='flex flex-row justify-end items-center'>
                <select className='h-10 p-2 rounded-lg w-80 bg-neutral-100' value={studentClass}  onChange={(e)=>setStudentClass(e.target.value)}>
                <option key={0} value="">Select Class</option>
                    {
                        studentClassList.map((item)=>(
                            <option key={item.sr_no} value={item.class_no}>{item.class_no}</option>
                        ))
                    }
                </select>
                <Button onClick={handleSubmit} >Submit</Button>
            </div>
            
        </div>
        <div className='p-2  m-2 rounded-lg flex justify-center bg-neutral-100 max-h-screen overflow-y-auto max-w-full'>
            <div className='w-full'>
                <div className='flex flex-row '>
                    <div className='p-4 border bg-neutral-300 border-black w-1/6'>{' '}</div>
                    <div className='w-5/6 flex flex-row '>
                        {
                            weekDays.map((item,index)=>(
                                <div key={index} className='flex border bg-neutral-300 border-black items-center justify-center p-2 w-1/4'>{item}</div>
                            ))
                        }
                    </div>
                    
                </div>
                <div className='w-full'>
                    {
                        studentTimeTableData.map((item,index)=>(
                            <div key={index} className='flex flex-row justify-center items-center '>
                                <div key={Math.floor(Math.random())} className=' h-full flex flex-col border border-black items-center p-5 justify-center w-1/6'>
                                        {item.lec_start_time}
                                </div>
                                <div className='w-5/6 flex flex-row'>
                                    {
                                        
                                        item.data.map((lec)=>{
                                            return(
                                                <div className={`w-1/4 border  border-black ${bgColor} flex flex-col items-center justify-center p-2`}  key={index}>
                                                    <div>{lec.sub_id}</div>
                                                    <div>{lec.sub_t_id}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewTimeTable