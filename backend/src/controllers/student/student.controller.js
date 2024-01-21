import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"
import {Student} from "../../models/student.models.js"
import  jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async(student_id)=>{
    try {
        console.log(student_id);
        const student = await Student.findOne({where: {student_id}})
        console.log("pppp"+student);
        const accessToken = jwt.sign({student_id:student.student_id},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
        console.log(accessToken);
        const refreshToken = jwt.sign(
            {
                student_id: student.student_id,
                
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        student.refresh_token = refreshToken
        await student.save({validate:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while making refresh or access token")
    }
}

const loginStudent = asyncHandler(async (req,res)=>{
    const {studentId,studentPassword} = req.body
    console.log(studentId,studentPassword)
    const sequelize= await connectDb()
    const result = await sequelize.query('select *from student where student_id = ?',{
        replacements: [studentId],
        type: QueryTypes.SELECT
    })
    console.log(result)
    if(studentPassword!==result[0].student_password){
        throw new ApiError(400,"Password is incorrect")
    }
    //console.log(result)
    const student_id = result[0].student_id
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(student_id)
    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                student:result,accessToken,refreshToken
            },"Successfully")
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
// const logoutUser = asyncHandler(async(req,res)=>{
//     User.findByIdAndUpdate(
//         req.user._id,
//         {
//             $set: {
//                 refreshToken: undefined
//             }
//         },
//         {
//             new: true
//         }
//     )
//     const options = {
//         httpOnly:true,
//         secure: true
//     }
//     return res
//     .status(200)
//     .clearCookie("accessToken",options)
//     .clearCookie("refreshToken",options)
//     .json(new ApiResponse(200,{},"User logged out"))

// })
const studentLogout = asyncHandler(async(req,res)=>{
    Student.update({refresh_token: undefined},{where: {student_id: req.student_id}}).then(result=>console.log("done"))
    .catch(error=>console.log("error"+error))
    
    console.log("hiiii");
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
    loginStudent,
    updateStudentPasswordWithOld,
    getCurrentUser,
    studentLogout
}