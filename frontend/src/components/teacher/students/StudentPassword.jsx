import axios from 'axios'
import React,{useEffect,useState} from 'react'
import Button from '../../Button'
import Input from '../../Input'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function StudentPassword() {
    const [studentData,setStudentData] = useState([])
    const [studentClassList,setStudentClassList] = useState([])
    const [studentClass,setStudentClass] = useState('')
    const [studentPassword,setStudentPassword] = useState('')
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
    },[studentPassword])

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
    const changeVisibility = (e,id)=>{
        setStudentData(studentData.map(student=>(
            student.student_id===id?{...student,isShow:!student.isShow}:student
        )))
    }
    const EditingStatus = (e,id)=>{
        setStudentData(studentData.map(student=>(
            student.student_id===id?{...student,isEditing:!student.isEditing}:student
        )))
    }
    const editStudentPassword = (e,id)=>{
        e.preventDefault()
        console.log('clicked');
        axios.post('http://localhost:8002/api/v1/teachers/students/setPassword',{
            student_id: id,
            student_password: studentPassword
        },{
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(result=>result.data)
        .then(result=>{
            console.log(result.data)
            Swal.fire({
                icon:'success',
                title: 'Done',
                text: 'Password changed Successfully',
                showConfirmButton: false,
                timer: 1500
            })
            
            setStudentData(studentData.map(student=>{
                return student.student_id===id?{...student,student_password:studentPassword,isEditing:false,isShow:false}:student
            }))
            setStudentPassword('')
        })
        .catch(err=>{
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong',
                showConfirmButton: false,
            })
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
                                <th className='w-1/4'>
                                    {' '}
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
                                    {item.isEditing? <Input value={studentPassword} onChange={e=>setStudentPassword(e.target.value)} className='w-full' /> :item.isShow? <Input value={item.student_password} readOnly={true} className='w-full' /> :<Input value={item.student_password} readOnly={true} type='password' className='w-full' />}
                                    </td>
                                    <td className='w-1/4 flex flex-row'>
                                        <Button bgColor='bg-green-400' onClick={(e)=>changeVisibility(e,item.student_id)} className=' m-2'>{item.isShow?"Hide":"Show"}</Button>
                                        {item.isEditing? <Button onClick={(e)=>editStudentPassword(e,item.student_id)} className='m-2' bgColor='bg-purple-400' >Submit</Button> :<Button onClick={e=>{EditingStatus(e,item.student_id);setStudentPassword(item.student_password)}} className='m-2' >Edit</Button>}
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