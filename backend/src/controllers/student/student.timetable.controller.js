import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"

const getStudentTimetable = asyncHandler(async(req,res)=>{
    const {studentClass} = req.body
    const weekDay = "MONDAY";
    const sequelize= await connectDb()
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

export{
    getStudentTimetable
}