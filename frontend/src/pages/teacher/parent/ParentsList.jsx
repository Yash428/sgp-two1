import React from 'react'
import {useSelector} from 'react-redux'

function ParentsList() {
    const teacherClass = useSelector(state=>state.auth.data.teacher_class)
    const [parentsList,setParentsList] = useState([])
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
            <div >
                {
                    isSelected?(<div className='flex flex-row m-1'><form >
                    <Button type='submit' className='flex flex-row items-center h-10 mx-2' bgColor='bg-green-500'><PiMicrosoftExcelLogoFill /> Export as Excel</Button>
                    </form>
                    <form >
                    <Button type='submit' className='flex flex-row items-center h-10 mx-2' bgColor='bg-red-500'><FaFilePdf />Export as Pdf</Button>
                    </form>
                    </div>
                    ):(null)
                }
            </div>
            
            
        </div>
        <div className='overflow-y-scroll h-5/6'>
            <div className=" overflow-auto min-w-full  py-2 align-middle md:px-6 lg:px-8">
                <div className="border border-gray-200 md:rounded-lg">
                    <table className="w-full divide-y h-full divide-gray-200">
                        <thead className="bg-gray-50 flex ">
                            <tr className='flex w-full sticky 0'>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-sm font-normal text-gray-700 w-1/4"
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
                                    className="px-4 py-3 text-center text-sm font-normal text-gray-700  w-1/4"
                                >
                                    Class
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-sm font-normal text-gray-700  w-1/4"
                                >
                                {' '}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y flex flex-col divide-gray-200 w-full items-center justify-center bg-white overflow-y-scroll">
                            {
                            studentList.map((item) => (
                                <tr key={item.student_id} className='w-full flex'>
                                    <td className="whitespace-nowrap px-4 py-4 w-1/4">
                                        <div className="ml-4">
                                            <div className="text-sm text-center font-medium text-gray-900">{item.student_id}</div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-12 py-4 w-1/4">
                                        <div className="text-sm text-center text-gray-900 "> {item.student_name} </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium w-1/4">
                                        <div className="text-sm text-center text-gray-900 ">{item.student_class}</div>
                                    </td>
                                    
                                    <td className="whitespace-nowrap flex flex-row items-center justify-center text-center text-sm font-medium w-1/4">
                                        <Link to={`/teacher/students/studentProfile/${item.student_id}`} className={`${LinkCss} m-1 flex flex-row items-center justify-center bg-green-700`} ><IoEye /> View</Link>
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
  )
}

export default ParentsList