import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"


const loginStudent = asyncHandler(async (req,res)=>{
    const {studentId,studentPassword} = req.body
    console.log(studentId,studentPassword)
    const sequelize= await connectDb()
    const result = await sequelize.query('select *from student where student_id = ?',{
        replacements: [studentId],
        type: QueryTypes.SELECT
    })

    if(studentPassword!==result[0].student_password){
        throw new ApiError(400,"Password is incorrect")
    }
    console.log(result)
    return res.status(200).json(
        new ApiResponse(200,result,"Successfully")
    )
})

const updateStudentPasswordWithOld = asyncHandler(async(req,res)=>{
    const {studentId,oldPassword,newPassword} = req.body
    console.log(oldPassword,newPassword);
    const sequelize= await connectDb()
    let result = await sequelize.query('select student_password from student where student_id = ?',{
        replacements: [studentId],
        type:QueryTypes.SELECT
    })
    console.log(result);
    if(oldPassword!==result[0].student_password){
        throw new ApiError(400, "incorrect Password")
    }
    result = await sequelize.query("UPDATE `school`.`student` SET `student_password` = ? WHERE (`student_id` = ?);",{
        replacements: [newPassword, studentId],
        type:QueryTypes.UPDATE
    })
    console.log(result);
    return res.status(200).json(
        new ApiResponse(200,{},"Successfully")
    )
})
const getCurrentUser = asyncHandler(async(req,res)=>{
    const {studentId} = req.body
    const sequelize= await connectDb()
    let result = await sequelize.query('select * from student where student_id = ?',{
        replacements: [studentId],
        type:QueryTypes.SELECT
    })
    console.log(result[0]);
    if(!result[0]){
        throw new ApiError(404, "User does not exist")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,result[0],"got it")
    )
})
const updateStudentProfile = asyncHandler(async(req,res)=>{

})
const updateStudentProfileImage = asyncHandler(async(req,res)=>{

})
const studentLogout = asyncHandler(async(req,res)=>{

})

export {
    loginStudent,
    updateStudentPasswordWithOld,
    getCurrentUser
}