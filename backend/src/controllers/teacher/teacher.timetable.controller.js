import { connectDb } from "../../db/index.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {QueryTypes} from "sequelize"

const teacherTimeTable = asyncHandler(async(req,res)=>{
    const {teacherId} = req.body
    const weekDay = "MONDAY"

    const sequelize = await connectDb()
    const result = await sequelize.query("select  tt.lec_start_time, tt.lec_end_time, s.subject_name, tt.sub_class from timetable as tt inner join subject as s on tt.sub_id = s.subject_id and (tt.sub_t_id=? AND tt.week_day=?) ORDER BY time_to_sec(tt.lec_start_time)",{
        replacements:[teacherId,weekDay],
        type: QueryTypes.SELECT
    })
    console.log(result);
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Teacher Timetable")
    )
})

export{
    teacherTimeTable
}