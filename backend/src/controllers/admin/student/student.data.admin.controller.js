import {asyncHandler} from '../../../utils/asyncHandler.js'
import { ApiError } from '../../../utils/ApiError.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import {Student} from '../../../models/student.models.js'
import { connectDb } from '../../../db/index.js'
import { QueryTypes } from 'sequelize'
import { studentAttendanceSummary } from './studentAttendance.admin.controller.js'

const studentByGender = asyncHandler(async(req,res)=>{
    const sequelize  = await connectDb()
    const data = await sequelize.query("select student_gender, count(student_id) as count from student group by student_gender")
    console.log(data);
    return res
    .status(200)
    .json(
        new ApiResponse(200,data,"Student Gender")
    )
})
const AttendanceEligibilityByClass = asyncHandler(async(req,res)=>{
    const {studentClass} = req.body
    const sequelize = await connectDb()
    const studentData = await sequelize.query("select student_id, 0 as attendance from student where student_class=?",{
        type: QueryTypes.SELECT,
        replacements: [studentClass]
    })
    if(!studentData){
        throw new ApiError(401,'Student not found')
    }
    let eligible = 0;
    let notEligible = 0;
    for(let student of studentData){
        let att = await studentAttendanceSummary({studentId:student.student_id})
        if(att>=75){
            eligible = eligible+1
        }
        else{
            notEligible = notEligible+1
        }
    }
    
    let attendance = {
        "eligible":{
            eligible
        },
        "notEligible":{
            notEligible
        }
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,attendance,"Attendance")
    )
})
const AttendanceEligibilityByGender = asyncHandler(async(req,res)=>{
    const {studentClass} = req.body
    const sequelize = await connectDb()
    const maleStudentData = await sequelize.query("select student_id, 0 as attendance from student where student_class=? and student_gender='male'",{
        type: QueryTypes.SELECT,
        replacements: [studentClass]
    })
    const femaleStudentData = await sequelize.query("select student_id, 0 as attendance from student where student_class=? and student_gender='female'",{
        type: QueryTypes.SELECT,
        replacements: [studentClass]
    })
    if(!maleStudentData && !femaleStudentData){
        throw new ApiError(401,'Student not found')
    }

    let eligibleMale = 0;
    let eligibleFemale = 0;
    let notEligibleMale = 0;
    let notEligibleFemale = 0;

    for(let student of maleStudentData){
        let att = await studentAttendanceSummary({studentId:student.student_id})
        if(att>=75){
            eligibleMale = eligibleMale+1
        }
        else{
            notEligibleMale = notEligibleMale+1
        }
    }
    for(let student of femaleStudentData){
        let att = await studentAttendanceSummary({studentId:student.student_id})
        if(att>=75){
            eligibleFemale = eligibleFemale+1
        }
        else{
            notEligibleFemale = notEligibleFemale+1
        }
    }
    let attendance = {
        "maleEligible":{
            eligibleMale
        },
        "maleNotEligible":{
            notEligibleMale
        },
        "femaleELigible":{
            eligibleFemale
        },
        "femaleNotEligible":{
            notEligibleFemale
        }
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,attendance,"Attendance")
    )
})

export{
    studentByGender,
    AttendanceEligibilityByGender,
    AttendanceEligibilityByClass
}