import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import {Student} from '../../../models/student.models.js'
import { connectDb } from '../../../db/index.js'
import { QueryTypes } from 'sequelize'

const getTeacherCount = asyncHandler(async(req,res)=>{
    const sequelize = await connectDb()
    const teacherCount = await sequelize.query("select count(*) as teacherCount from teacher",{
        type: QueryTypes.SELECT
    })
    console.log(teacherCount);
    return res
    .status(200)
    .json(
        new ApiResponse(200,teacherCount,"Teacher count")
    )
})

export{
    getTeacherCount
}