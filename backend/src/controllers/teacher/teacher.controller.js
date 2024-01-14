import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"

const loginTeacher = asyncHandler(async(req,res)=>{
    const {teacherId,teacherPassword} = req.body
    console.log(teacherId,teacherPassword)
    const sequelize= await connectDb()
    const result = await sequelize.query('select *from teacher where teacher_id = ?',{
        replacements: [teacherId],
        type: QueryTypes.SELECT
    })

    if(teacherPassword!==result[0].teacher_password){
        throw new ApiError(400,"Password is incorrect")
    }
    console.log(result)
    return res.status(200).json(
        new ApiResponse(200,result,"Successfully")
    )
})

const updateTeacherPassword = asyncHandler(async(req,res)=>{
    const {teacherId,oldPassword,newPassword} = req.body
    console.log(oldPassword,newPassword);
    const sequelize= await connectDb()
    let result = await sequelize.query('select teacher_password from teacher where teacher_id = ?',{
        replacements: [teacherId],
        type:QueryTypes.SELECT
    })
    console.log(result);
    if(oldPassword!==result[0].teacher_password){
        throw new ApiError(400, "incorrect Password")
    }
    result = await sequelize.query("UPDATE `school`.`teacher` SET `teacher_password` = ? WHERE (`teacher_id` = ?);",{
        replacements: [newPassword, teacherId],
        type:QueryTypes.UPDATE
    })
    console.log(result);
    return res.status(200).json(
        new ApiResponse(200,{},"Successfully")
    )
})

export {
    loginTeacher,
    updateTeacherPassword
}