import {asyncHandler} from '../../../utils/asyncHandler.js'
import { ApiError } from '../../../utils/ApiError.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import {Student} from '../../../models/student.models.js'
import { connectDb } from '../../../db/index.js'
import { QueryTypes } from 'sequelize'

const addStudent = asyncHandler(async(req,res)=>{
    const studentData = req.body
    console.log(studentData);
    if(!studentData){
        throw new ApiError(404,"Student not found")
    }
    const sequelize = await connectDb()
    const sClass = studentData.student_class.charAt(0)
    const student = await sequelize.query("select student_id from student where student_class like ? order by student_id desc limit  1",{
        type: QueryTypes.SELECT,
        replacements: [sClass]
    })
    
    return res
    .status(200)
    .json(
        new ApiResponse(200, studentData,"Student successfully added")
    )
})

export{
    addStudent,
}