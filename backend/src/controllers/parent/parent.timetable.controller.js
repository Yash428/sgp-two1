import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"

export const timetable = asyncHandler(async(req,res)=>{
    const {parentId} =req.body
    const sequelize = await connectDb()
    const weekDay = "MONDAY";
    const studentId = await sequelize.query("select * from student where parent_id = ?",{
        replacements: [parentId],
        type: QueryTypes.SELECT
    })
    if(!studentId){
        throw new ApiError(400, "Student not found")
    }
    console.log(studentId);
    const studentClass = studentId[0].student_class;
    let sql = "select tt.lec_start_time, tt.lec_end_time,tt.sub_id ,t.teacher_name from teacher as t inner join timetable as tt on tt.sub_t_id = t.teacher_id  and (tt.week_day= ? and tt.sub_class=? AND (tt.sub_id!= 'BR' And tt.sub_id!='NA'))"
    const result = await sequelize.query(sql,{
        replacements: [weekDay,studentClass],
        type: QueryTypes.SELECT
    })
    console.log(result);
    if(!result || result.length===0){
        throw new ApiError(400, "Nothing is there")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"timetable sent")
    )
})