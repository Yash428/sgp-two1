import {QueryTypes, Sequelize, json} from "sequelize"
import { ApiError, ApiResponse } from "../../../utils/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { getStudentDetails,getStudentByClass } from "./student.admin.controller.js"
import { connectDb } from "../../../db/index.js"

const studentAttendanceSummary = async({studentId,studentClass}) => {

    let attList = []
    let total= await getTotalCount(studentId);
    let present = await getPresentCount(studentId);
    let subjectId = "Overall"
    let overallAttendance = (total===0)?0:Math.round((present*100)/total)
    return overallAttendance
}

const getTotalCount = async(studentId) =>{
    const sequelize= await connectDb()
    const result = await sequelize.query("select count(a.is_present) as p from timetable as tt inner join att_par as a1 on a1.tt_id  = tt.tt_id inner join att_table as a on a.att_p_id  = a1.att_p_id where (a.st_id =  'S23001') order by tt.sub_id;",{
        replacements: [studentId],
        type: QueryTypes.SELECT
    })
    return result[0].p
}

const getPresentCount = async(studentId)=>{
    const sequelize= await connectDb()
    const result = await sequelize.query("select count(a.is_present) as p from timetable as tt inner join att_par as a1 on a1.tt_id  = tt.tt_id inner join att_table as a on a.att_p_id  = a1.att_p_id where (a.st_id =  ?  and a.is_present is true) order by tt.sub_id;",{
        replacements: [studentId],
        type: QueryTypes.SELECT
    })
    return result[0].p
}

const getSubjectList = async(studentClass)=>{
    console.log(studentClass);
    const sequelize= await connectDb()
    const result = await sequelize.query("select distinct tt.sub_id from timetable as tt where sub_class=? and(tt.sub_id!='BR' and tt.sub_id!='NA') ",{
        replacements: [studentClass],
        type: QueryTypes.SELECT
    })
    return result
}
const getAttendanceByClass = asyncHandler(async(req,res)=>{
    const {studentClass} = req.body
    const sequelize = await connectDb()
    const studentList =   await sequelize.query('select student_id,student_name,student_class, 0 as attendance from student where student_class=?',{
        replacements: [studentClass],
        type: QueryTypes.SELECT
    })
    for(let student of studentList){
        let att = await studentAttendanceSummary({studentId:student.student_id,studentClass:student.student_class})
        student.attendance = att
    }
    if(!studentList){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,studentList,"Student Attendance list")
    )
})

export {
    studentAttendanceSummary,
    getSubjectList,
    getAttendanceByClass
}