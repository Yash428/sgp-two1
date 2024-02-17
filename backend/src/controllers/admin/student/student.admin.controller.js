import {asyncHandler} from '../../../utils/asyncHandler.js'
import { ApiError } from '../../../utils/ApiError.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import {Student} from '../../../models/student.models.js'
import { connectDb } from '../../../db/index.js'
import { QueryTypes } from 'sequelize'

const getClassNames = asyncHandler(async(req,res)=>{
    const sequelize = await connectDb()
    const sClassList = await sequelize.query("SELECT * FROM school WHERE class_no!='NA' ORDER BY sr_no",{
        type: QueryTypes.SELECT
    })
    if(!sClassList){
        throw new ApiError(400, "Failed to get class names")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,sClassList,"Class Names got")
    )
})

const getStudentDetails = asyncHandler(async(req,res)=>{
    const {student_id} = req.body
    const sequelize = await connectDb()
    const student = await sequelize.query("select *from student join parent on student.parent_id = parent.parent_id and student_id=? ",{
        replacements: [student_id],
        type: QueryTypes.SELECT
    })
    if(!student){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,student,"Student list")
    )
})

const getStudentByClass = asyncHandler(async(req,res)=>{
    const {student_class} = req.body
    const sequelize = await connectDb()
    const studentList = await sequelize.query('select student_id,student_name,student_class from student where student_class=?',{
        replacements: [student_class],
        type: QueryTypes.SELECT
    })
    if(!studentList){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,studentList,"Student list")
    )
})
const deleteStudent = asyncHandler(async(req,res)=>{

    const {student_id} = req.body;
    console.log(student_id);
    const sequelize = await connectDb()
    const result = await Student.destroy({where: {student_id}})
    console.log(result);
    if(!result){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Student deleted")
    )
})
const generateStudentExcel = asyncHandler(async(req,res)=>{
    
})
const addStudent = asyncHandler(async(req,res)=>{
    const studentData = req.body
    console.log(studentData);
    if(!studentData){
        throw new ApiError(404,"Student not found")
    }
    const sequelize = await connectDb()
    const sClass = studentData.student_class.charAt(0)
    const student = await sequelize.query("select student_id from student where student_class like ? order by student_id desc limit  1",{
        type: QueryTypes.SELECT,
        replacements: [sClass]
    })
    console.log(student);
    return res
    .status(200)
    .json(
        new ApiResponse(200, studentData,"Student successfully added")
    )
})

export{
    addStudent,
    getClassNames,
    getStudentByClass,
    getStudentDetails,
    deleteStudent
}