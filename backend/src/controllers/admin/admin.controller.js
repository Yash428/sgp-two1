import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"
import{Admin} from "../../models/admin.models.js"
import jwt from "jsonwebtoken"
const generateAccessAndRefreshToken = async(adminId) =>{
    try {
        const admin = await Admin.findOne({where: {admin_id:adminId}})
        const acceessToken = jwt.sign({
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
        return {acceessToken,refreshToken}
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
    const {acceessToken,refreshToken} = await generateAccessAndRefreshToken(admin_id)
    const options = {
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",acceessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{
            admin:admin,acceessToken,refreshToken
        },"admin logged in")
    )

})
export{
    loginAdmin
}