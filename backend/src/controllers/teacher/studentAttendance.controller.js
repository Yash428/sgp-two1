import {ApiError, ApiResponse} from '../../utils/index.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { QueryTypes } from 'sequelize'
import { connectDb } from '../../db/index.js'
// it returns a list of all the pending attendance details
// like att_p_id, date, start to end time, class name, subject name
const getAllPendingAttendance = asyncHandler(async(req,res)=>{
    const {teacherId} = req.body
    const date = new Date()
    console.log(date);
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const currentDate = year+'-'+month+'-'+day
    console.log(currentDate);
    const sequelize= await connectDb()
    const AttList = await sequelize.query("select a.att_p_id,c.cl_date,tt.lec_start_time,tt.lec_end_time,tt.sub_class,s.subject_name from att_par as a"+
    " inner join timetable as tt" +
    " on a.tt_id = tt.tt_id and (tt.sub_t_id=? and a.is_taken=0)" +
    " inner join calendar as c" +
    " on a.cl_id= c.cl_id and (c.cl_date<=?) " +
    " inner join subject as s" +
    " on s.subject_id = tt.sub_id order by c.cl_id; ",{
        replacements: [teacherId,currentDate],
        type: QueryTypes.SELECT
    })
    console.log(AttList);
    console.log(currentDate);
    if(AttList.length ===0){
        throw new ApiError(400, "No Attendance")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,AttList,"Successfully added")
    )
})
const getStudentIdsByAttPId= asyncHandler(async(req,res)=>{
    const {att_p_id} = req.body
    const sequelize= await connectDb()
    const studentList = await sequelize.query("select student_id from student where student_class = "+
    "(select t.sub_class from att_par as a "+
    "inner join timetable as t "+
    "on t.tt_id= a.tt_id and a.att_p_id=?)",{
        replacements: [att_p_id],
        type: QueryTypes.SELECT
    })
    console.log(studentList);
    if(!studentList){
        throw new ApiError(200,"not get any student")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,studentList,"Student List got")
    )
})

const getStudentsByAttPId = asyncHandler(async(req,res)=>{
    const {att_p_id} = req.body
    const sequelize= await connectDb()
    const studentList = await sequelize.query("select student_id,student_name,0 as is_present from student where student_class = "+
    "(select t.sub_class from att_par as a "+
    "inner join timetable as t "+
    "on t.tt_id= a.tt_id and a.att_p_id=?)",{
        replacements: [att_p_id],
        type: QueryTypes.SELECT
    })
    console.log(studentList);
    for(let i=0;i<studentList.length;i++){
        if(studentList[i].is_present === 0){
            studentList[i].is_present = false
        }
        else{
            studentList[i].is_present = true
        }
    }
    console.log(studentList);
    if(!studentList){
        throw new ApiError(200,"not get any student")
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,studentList,"Student List got")
    )
})

const addAttendceEntry = asyncHandler(async(req,res)=>{
    const {att_p_id,attendanceData} = req.body
    const sequelize= await connectDb()
    let a = 0;
    for(let i=0;i<attendanceData.length;i++ ){
        const addAtt = await sequelize.query("INSERT INTO att_table (att_p_id, st_id, is_present) VALUES (?, ?, ?)",{
            replacements: [att_p_id,attendanceData[i].student_id,attendanceData[i].is_present],
            type: QueryTypes.INSERT
        })
        a=a+1
        if(!addAtt){
            throw new ApiError(200,"Failed to add attendance of "+i)
        }
    }
    // console.log(a);
    if(a!=attendanceData.length){
        throw new ApiError(400, "Failed to add Attendance")
    }
    const isTakenUpdateValue = await isTakenUpdate(att_p_id)
    if(!isTakenUpdateValue){
        throw new ApiError(401,"Failed to update attendance flag")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,a,"Successfully added")
    )
})
const isTakenUpdate = async(att_p_id)=>{
    const sequelize= await connectDb()
    const update = await sequelize.query("UPDATE `school`.`att_par` SET `is_taken` = '1' WHERE (`att_p_id` = '26');",{
        replacements: [att_p_id],
        type: QueryTypes.UPDATE
    })
    console.log(update);
    if(!update){
        return false
    }
    return true
}
const lectureDataByAttPId = asyncHandler(async (req,res) =>{
    const {att_p_id} = req.body
    const sequelize= await connectDb()
    const lectureData = await sequelize.query("select *from timetable where tt_id= ( "+
        " select tt_id from att_par where att_p_id=?);",{
            replacements: [att_p_id],
            type: QueryTypes.SELECT
        })
    if(!lectureData){
        throw new ApiError(400, "Failed to get lecture data")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,lectureData,"Lecture Data got")
    )
}) 
export {
    getAllPendingAttendance,
    addAttendceEntry,
    getStudentsByAttPId,
    lectureDataByAttPId,
    getStudentIdsByAttPId
}

