import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize, where} from "sequelize"
import { Teacher } from "../../models/teacher.models.js"
import  jwt  from "jsonwebtoken"
const generateAccessAndRefreshToken = async(teacher_id)=>{
    try {
        console.log(teacher_id);
        const teacher = await Teacher.findOne({where: {teacher_id}})
        if(!teacher){
            throw new ApiError(401,'User does not exist')
        }
        const accessToken = jwt.sign({teacher_id: teacher.teacher_id},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
        const refreshToken = jwt.sign({teacher_id:teacher.teacher_id},
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        teacher.refresh_token = refreshToken
        await teacher.save({validate:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while making refresh or access token")
    }
}

const loginTeacher = asyncHandler(async(req,res)=>{
    const {teacherId,teacherPassword} = req.body
    console.log(teacherId,teacherPassword)
    // const sequelize= await connectDb()
    // const result = await sequelize.query('select *from teacher where teacher_id = ?',{
    //     replacements: [teacherId],
    //     type: QueryTypes.SELECT
    // })
    const teacher= await Teacher.findOne({where: {teacher_id:teacherId}})
    console.log(teacher);
    if(!teacher){
        throw new ApiError(401, "Invalid User")
    }
    if(teacherPassword!==teacher.teacher_password){
        throw new ApiError(400,"Password is incorrect")
    }
    console.log(teacher)
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(teacher.teacher_id)
    const options = {
        secure: true,
        httpOnly : true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{
            teacher,accessToken,refreshToken
        },"Successfully")
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

const logoutTeacher = asyncHandler(async(req,res)=>{
    const teacher = await Teacher.findOne({where: {teacher_id: req.teacher.teacher_id}})
    teacher.refresh_token = null
    await teacher.save({validate: false})
    console.log(teacher);
    const options = {
        httpOnly:true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))
})


export {
    loginTeacher,
    updateTeacherPassword,
    logoutTeacher
}