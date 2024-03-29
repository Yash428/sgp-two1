import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"
import{Admin} from "../../models/admin.models.js"
import jwt from "jsonwebtoken"
const generateAccessAndRefreshToken = async(adminId) =>{
    try {
        const admin = await Admin.findOne({where: {admin_id:adminId}})
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
    } catch (error) {
        console.log(error);
    }
}
const loginAdmin = asyncHandler(async(req,res)=>{
    const {adminId,adminPassword} = req.body
    const sequelize = await connectDb()
    const admin = await Admin.findOne({where: {admin_id:adminId}})
    console.log(adminId+" "+adminPassword);
    if(adminPassword!==admin.password){
        throw new ApiError(400,"Password is wrong")
    }
    const admin_id = admin.admin_id
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(admin_id)
    const options = {
        httpOnly:true,
        secure:true
    }
    console.log(accessToken);
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{
            admin:admin,accessToken,refreshToken
        },"admin logged in")
    )

})
const logoutAdmin = asyncHandler(async(req,res)=>{
    const admin = await Admin.findOne({where: {admin_id: req.admin.admin_id}})
    admin.refresh_token = null
    await admin.save({validate: false})
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"logged Out Successfully"))
})
export{
    loginAdmin,
    logoutAdmin,
}