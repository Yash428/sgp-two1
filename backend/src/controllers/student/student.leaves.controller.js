import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"
import {Student} from "../../models/student.models.js"
export const getCurrentDate=()=>{
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const currentDate = year+'-'+month+'-'+day
    return currentDate
}
const addLeaveApplication = asyncHandler(async(req,res)=>{
    const {student_id,reason,start_date,end_date,d_name,d_no,d_city,d_email} = req.body
    if(!student_id || !reason || !start_date || !end_date || !d_name || !d_no || !d_city || !d_email){
        throw new ApiError(400, "All fields are required")
    }
    const appli_date = getCurrentDate()
    const status = 'pending'
    const query = "insert into student_leaves(student_id,reason,start_date,end_date,d_name,d_no,d_city,d_email,status,appli_date) values(?,?,?,?,?,?,?,?,?,?);"
    const sequelize = await connectDb()
    const result  = await sequelize.query(query,{
        replacements:[student_id,reason,start_date,end_date,d_name,d_no,d_city,d_email,status,appli_date],
        type:QueryTypes.INSERT
    })
    if(!result){
        throw new ApiError(400, "Student not found")
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,result[0],"Student added")
    )
})
const pendingApplications  = asyncHandler(async(req,res)=>{
    const {student_id} = req.body
    if(!student_id){
        throw new ApiError(400, "All fields are required")
    }
    const sequelize = await connectDb()
    const result  = await sequelize.query("select *from student_leaves where status = 'pending' and student_id = ?;",{
        replacements: [student_id],
        type:QueryTypes.SELECT
    })
    if(!result){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Student list")
    )
})
const rejectedApplications = asyncHandler(async(req,res)=>{
    const {student_id} = req.body
    if(!student_id){
        throw new ApiError(400, "All fields are required")
    }
    const sequelize = await connectDb()
    const result  = await sequelize.query("select *from student_leaves where status = 'rejected' and student_id = ?;",{
        replacements: [student_id],
        type:QueryTypes.SELECT
    })
    if(!result){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Student list")
    )
})
const acceptedApplications = asyncHandler(async(req,res)=>{
    const {student_id} = req.body
    if(!student_id){
        throw new ApiError(400, "All fields are required")
    }
    const sequelize = await connectDb()
    const result  = await sequelize.query("select *from student_leaves where status = 'approved' and student_id = ?;",{
        replacements: [student_id],
        type:QueryTypes.SELECT
    })
    if(!result){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Student list")
    )
})
export{
    addLeaveApplication,
    pendingApplications,
    rejectedApplications,
    acceptedApplications
}