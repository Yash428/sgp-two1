import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {connectDb} from "../db/index.js"
import jwt from "jsonwebtoken"
import {QueryTypes, Sequelize} from "sequelize"
import { Admin } from "../models/admin.models.js"
import {Student} from '../models/student.models.js'
import {Parent} from "../models/parent.models.js"
import {Teacher} from "../models/teacher.models.js"

const generateAccessAndRefreshToken = async (id,role)=>{
    try {
        if(role === "admin"){
            const admin = await Admin.findOne({where: {admin_id:id}})
            if(!admin){
                throw new ApiError(401,'User does not exist')
            }
            const accessToken = jwt.sign({
                admin_id:admin.admin_id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            })
            const refreshToken = jwt.sign({
                admin_id:admin.admin_id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            })
            admin.refresh_token = refreshToken
            await admin.save({validate:false})
            return {accessToken,refreshToken}
        }
        else if(role === "teacher"){
            const teacher = await Teacher.findOne({where: {teacher_id:id}})
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
        }
        else if(role === "student"){
            const student = await Student.findOne({where: {student_id:id}})
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
        }
        else if(role === "parent"){
            const parent = await Parent.findOne({where: {parent_id:id}})
            if(!parent){
                throw new ApiError(401,'User does not exist')
            }
            const accessToken = jwt.sign({parent_id:parent.parent_id},
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                }
            )
            const refreshToken = jwt.sign({parent_id: parent.parent_id},
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
                }
            )
            parent.refresh_token = refreshToken
            await parent.save({validate:false})
            return {accessToken,refreshToken}
        }
        else{
            throw new ApiError(401,"Invalid role")
        }
    } catch (error) {
        console.log(error);
    }
}

const login = asyncHandler(async(req,res)=>{
    const {id,password} = req.body
    if(id[0]==='S'){
        const student = await Student.findOne({where: {student_id:id}})
        if(!student){
            throw new ApiError(401,'User does not exist')
        }
        if(student.student_password!==password){
            throw new ApiError(401,'Invalid password')
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(student.student_id,"student")
        const options = {
            httpOnly:true,
            secure:true
        }
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .cookie("role","student",options)
        .json(
            new ApiResponse(200,
                {
                    user:student,accessToken,refreshToken
                },"Successfully")
        )
    }
    else if(id[0]==='T'){
        const teacher = await Teacher.findOne({where: {teacher_id:id}})
        if(!teacher){
            throw new ApiError(401,'User does not exist')
        }
        if(teacher.teacher_password!==password){
            throw new ApiError(401,'Invalid password')
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(teacher.teacher_id,"teacher")
        const options = {
            httpOnly:true,
            secure:true
        }
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .cookie("role","teacher",options)
        .json(
            new ApiResponse(200,
                {
                    user:teacher,accessToken,refreshToken
                },"Successfully")
        )
    }
    else if(id[0]==='A'){
        const admin = await Admin.findOne({where: {admin_id:id}})
        if(!admin){
            throw new ApiError(401,'User does not exist')
        }
        if(admin.password!==password){
            throw new ApiError(401,'Invalid password')
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(admin.admin_id,"admin")
        const options = {
            httpOnly:true,
            secure:true
        }
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .cookie("role","admin",options)
        .json(
            new ApiResponse(200,
                {
                    user:admin,accessToken,refreshToken
                },"Successfully")
        )
    }
    else if(id[0]==='P'){
        const parent = await Parent.findOne({where: {parent_id:id}})
        if(!parent){
            throw new ApiError(401,'User does not exist')
        }
        if(parent.password!==password){
            throw new ApiError(401,'Invalid password')
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(parent.parent_id,"parent")
        const options = {
            httpOnly:true,
            secure:true
        }
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .cookie("role","parent",options)
        .json(
            new ApiResponse(200,
                {
                    user:parent,accessToken,refreshToken
                },"Successfully")
        )
    }
    else{
        throw new ApiError(401,"Invalid id")
    }

})

const logout = asyncHandler(async(req,res)=>{
    if(req.user.role==='student'){
        const student = await Student.findOne({where: {student_id:req.user.student_id}})
        if(!student){
            throw new ApiError(401,'User does not exist')
        }
        student.refresh_token = null
        await student.save({validate: false})
        const options = {
            httpOnly:true,
            secure:true
        }
        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .clearCookie("role",options)
        .json(
            new ApiResponse(200,{},"logged out")
        )
    }
    else if(req.user.role==='teacher'){
        const teacher = await Teacher.findOne({where: {teacher_id:req.user.teacher_id}})
        if(!teacher){
            throw new ApiError(401,'User does not exist')
        }
        teacher.refresh_token = null
        await teacher.save({validate: false})
        const options = {
            httpOnly:true,
            secure:true
        }
        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .clearCookie("role",options)
        .json(
            new ApiResponse(200,{},"logged out")
        )
    }
    else if(req.user.role==='admin'){
        const admin = await Admin.findOne({where: {admin_id:req.user.admin_id}})
        if(!admin){
            throw new ApiError(401,'User does not exist')
        }
        admin.refresh_token = null
        await admin.save({validate: false})
        const options = {
            httpOnly:true,
            secure:true
        }
        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .clearCookie("role",options)
        .json(
            new ApiResponse(200,{},"logged out")
        )
    }
    else if(req.user.role==='parent'){
        const parent = await Parent.findOne({where: {parent_id:req.user.parent_id}})
        if(!parent){
            throw new ApiError(401,'User does not exist')
        }
        parent.refresh_token = null
        await parent.save({validate: false})
        const options = {
            httpOnly:true,
            secure:true
        }
        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .clearCookie("role",options)
        .json(
            new ApiResponse(200,{},"logged out")
        )
    }
    else{
        throw new ApiError(401,"Invalid id")
    }
})

export {
    login,
    logout
}