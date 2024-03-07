import axios from 'axios'
import React,{useEffect,useState} from 'react'
import Button from '../../Button'
import Input from '../../Input'
function StudentPassword() {
    const [studentData,setStudentData] = useState([])
    const [studentClassList,setStudentClassList] = useState([])
    const [studentClass,setStudentClass] = useState('')

    useEffect(()=>{
        axios.post('http://localhost:8002/api/v1/teachers/students/class',{},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>{
            console.log(result.data.data);
            setStudentClassList(result.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    const onSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8002/api/v1/teachers/students/getStudentPassword',{studentClass},{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>{
            console.log(result.data.data);
            setStudentData(result.data.data)
        })
        .catch(error=>{
            console.log(error);
        })
    }
return (
    <div className='h-screen bg-neutral-200'>
        <div className=' h-16 bg-neutral-100 m-4 my-2 rounded-lg min-w-96 flex items-center sticky'>
            <div><span className='px-4 py-2 text-2xl '> Student List </span></div>
            <form onSubmit={onSubmit} className='flex'>
                <select name="" id="studentClass" className='h-10 p-2 mx-3 rounded-lg w-80 bg-neutral-100' value={studentClass}  onChange={(e)=>setStudentClass(e.target.value)}>
                    <option key={0} value="">Select Class</option>
                    {
                        studentClassList.map((item)=>(
                            <option key={item.sr_no} value={item.class_no}>{item.class_no}</option>
                        ))
                    }
                </select>
                <Button type='submit' >Submit</Button>
            </form>
        </div>
        <div className='overflow-y-scroll h-5/6'>
            <div className=" overflow-auto min-w-full  py-2 align-middle md:px-6 lg:px-8">
                <div className="border border-gray-200 md:rounded-lg">
                    <table className="w-full divide-y h-full divide-gray-200">
                        <thead className="bg-gray-50 flex ">
                            <tr className='flex w-full sticky 0'>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-sm font-normal text-gray-700 w-1/5"
                                >
                                    <span>Id</span>
                                </th>
                                <th
                                    scope="col"
                                    className="px-12 py-3 text-center text-sm font-normal text-gray-700  w-1/4"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-sm font-normal text-gray-700  w-1/3"
                                >
                                Password
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y flex flex-col divide-gray-200 w-full items-center justify-center bg-white overflow-y-scroll">
                            {
                            studentData.map((item) => (
                                <tr key={item.student_id} className='w-full flex'>
                                    <td className="whitespace-nowrap px-4 py-4 w-1/5">
                                        <div className="ml-4">
                                            <div className="text-sm text-center font-medium text-gray-900">{item.student_id}</div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-12 py-4 w-1/4">
                                        <div className="text-sm text-center text-gray-900 "> {item.student_name} </div>
                                    </td>
                                    <td className="whitespace-nowrap flex flex-row items-center justify-center text-center text-sm font-medium w-1/3">
                                        <Input value={item.student_password} readOnly className='w-full' />
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentPassword