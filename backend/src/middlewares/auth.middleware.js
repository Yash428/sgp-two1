import Student from "../models/student.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError,ApiResponse} from "../utils/index.js"
import jwt from 'jsonwebtoken'

export const verifyStudentJWT = asyncHandler(async(req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = Student.findOne({where: {student_id:decodedToken?.student_id}})
        if(!user){
            throw new ApiError(401,"Invalid user")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})