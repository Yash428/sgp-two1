import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"
import {Student} from "../../models/student.models.js"
import { getCurrentDate } from "./student.leaves.controller.js"
const studentExamTimeTable = asyncHandler(async(req,res)=>{
    const {student_class} = req.body
    const query = "select exam.exam_date,exam.subject,exam.class,exam_cat.type,exam_cat.category from exam "+
    "inner join exam_cat "+
    "on exam.e_cat = exam_cat.ec_id "+
    "where exam.class = ? and exam.exam_date>?"+ 
    "order by exam.class,exam.exam_date; "
    const sequelize = await connectDb()
    const result = await sequelize.query(query,{
        replacements: [student_class,getCurrentDate()],
        type: QueryTypes.SELECT
    })
    console.log(result);
    if(!result.length){
        throw new ApiError(400, "Exam time table not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, result,"Exam time table")
    )
})

const getStudentWiseMarks = asyncHandler(async(req,res)=>{
    const {student_id} = req.body
    const sequelize = await connectDb()
    const result = await sequelize.query("select m.student_id, m.teacher_id, m.gained_marks, e.exam_date, e.subject, ec.category, ec.total_marks from mark as m "+
    "inner join exam as e "+
    "on m.exam_id = e.exam_id "+
    "inner join exam_cat as ec "+
    "on ec.ec_id = e.e_cat "+
    "where m.student_id=?;",{
        replacements: [student_id],
        type: QueryTypes.SELECT
    })
    console.log(result);
    if(!result.length){
        throw new ApiError(400, "Student marks not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, result,"Student marks")
    )
})

export {
    studentExamTimeTable,
    getStudentWiseMarks
}