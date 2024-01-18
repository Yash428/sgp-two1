import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError,ApiResponse } from "../../../utils/index.js";
import { connectDb } from "../../../db/index.js";
import {QueryTypes} from "sequelize"

const getStudentPasswordByClass = asyncHandler(async(req,res)=>{
    const {teacherClass} = req.body
    const sequelize = await connectDb()
    const result = await sequelize.query("select s.student_id,s.student_password,s.student_name from student as s inner join teacher as t on t.teacher_class = s.student_class and s.student_class = ?;",{
        replacements:[teacherClass],
        type: QueryTypes.SELECT
    })
    console.log(result);
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Student password list")
    )
})

const getStudentListByClass = asyncHandler(async(req,res)=>{
    const {teacherClass} = req.body
    const sequelize = await connectDb()
    const result = await sequelize.query("select s.student_id,s.student_name from student as s inner join teacher as t on t.teacher_class = s.student_class and s.student_class = ?;",{
        replacements:[teacherClass],
        type: QueryTypes.SELECT
    })
    console.log(result);
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Student list")
    )
})

export{
    getStudentPasswordByClass,
    getStudentListByClass
}