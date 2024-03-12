import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"
import {Student} from "../../models/student.models.js"
import  jwt from "jsonwebtoken"
import {uploadOnCloudinary, deleteFromCloudinary} from "../../utils/cloudinary.js"


const generateAccessAndRefreshToken = async(student_id)=>{
    try {
        const student = await Student.findOne({where: {student_id}})
        const accessToken = jwt.sign({student_id:student.student_id},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
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
    console.log(result.length);
    if(result.length===0){
        throw new ApiError(400,"Not found")
    }
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
        new ApiResponse(200,{message:"Password changed Successfully"},"Successfully")
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
    // console.log("huu  hh");
    // console.log(req.student.student_id);
    const student = await Student.findOne({where: {student_id:req.student.student_id}})
    student.refresh_token = null
    console.log(student);
    await student.save({validate: false})
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

const addProfilePicture = asyncHandler(async(req,res)=>{
    console.log(req.file);
    const profileImage = req.file?.path
    if(!profileImage){
        throw new ApiError(400, "No image selected")
    }
    const image = await uploadOnCloudinary(profileImage)
    if(!image.url){
        throw new ApiError(500, "Something went wrong")
    }
    const student = await Student.findOne({where: {student_id:req.student.student_id}})
    student.profile_picture = image.url
    await student.save({validate: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {},"Image Uploaded successfully"))
})

const updateProfilePicture = asyncHandler(async (req,res) => {
    const newProfilePicture = await req.file?.path
    if(!newProfilePicture){
        throw new ApiError(400, "No image selected")
    }
    const student = await Student.findOne({where: {student_id: req.student.student_id}})
    // console.log(student);
    const oldPicture = student.profile_picture
    // console.log(oldPicture);
    const oldPictureUrl = oldPicture.split("/")
    // console.log(oldPictureUrl);
    let n = oldPictureUrl.length;
    const oldPictureId = oldPictureUrl[n-1].replace(".jpg","");
    // console.log(oldPictureId);
    const p = await deleteFromCloudinary(oldPictureId)
    if(p===false){
        console.log("It's null");
        throw new ApiError(500, "Something went wrong")
    }
    const image = await uploadOnCloudinary(newProfilePicture)
    student.profile_picture = image.url
    await student.save({validate: false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"profile picture updated"))

})

const printHello = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Hello")
    )
})
export {
    loginStudent,
    updateStudentPasswordWithOld,
    getCurrentUser,
    studentLogout,
    addProfilePicture,
    updateProfilePicture,
    printHello
}