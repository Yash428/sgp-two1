import {Student} from "../models/student.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError,ApiResponse} from "../utils/index.js"
import jwt from 'jsonwebtoken'
import {Teacher} from "../models/teacher.models.js"
import { Admin } from "../models/admin.models.js"
export const verifyStudentJWT = asyncHandler(async(req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
        
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        
        const user = await Student.findOne({where: {student_id:decodedToken?.student_id}})
        if(!user){
            throw new ApiError(401,"Invalid user")
        }
        req.student= user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})

export const verifyTeacherJWT = asyncHandler(async(req,_,next)=>{
    try {
        console.log('bbb');
        const token  = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log(token);
        if(!token){
            throw new ApiError(401, "unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const teacherUser = await Teacher.findOne({where: {teacher_id: decodedToken?.teacher_id}})
        console.log(teacherUser);
        if(!teacherUser){
            throw new ApiError(401, "invalid user")
        }
        req.teacher = teacherUser
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})

export const verfyAdminJWT = asyncHandler(async(req,_,next)=>{
    try {
        const token  = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log(token);
        if(!token){
            throw new ApiError(401, "unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const adminUser = await Admin.findOne({where: {admin_id: decodedToken?.admin_id}})
        if(!adminUser){
            throw new ApiError(401, "invalid user")
        }
        req.admin = adminUser
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})