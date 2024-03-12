import {asyncHandler} from '../../../utils/asyncHandler.js'
import { ApiError } from '../../../utils/ApiError.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import {Student} from '../../../models/student.models.js'
import { connectDb } from '../../../db/index.js'
import { QueryTypes } from 'sequelize'

const studetTimetableByClass = asyncHandler(async(req,res)=>{
    const {studentClass} = req.body
    const sequelize = await connectDb()
    const weekDay = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY']
    const lec_start_times = ['09:10:00','10:10:00','11:10:00','12:10:00','13:10:00','14:20:00','15:20:00']
    let timetableData = []
    let data1 = []
    for(let time of lec_start_times){
        data1 = []
        for(let day of weekDay){
            let data = await sequelize.query("select sub_id,week_day, sub_t_id,lec_start_time,lec_end_time from timetable where sub_class=? and lec_start_time=?  and week_day= ? order by lec_start_time",{
                replacements: [studentClass,time,day],
                type: QueryTypes.SELECT
            })
            data1.push(data[0])
        }
        timetableData.push({lec_start_time:time,data:data1})
    }
    console.log(timetableData);
    return res
    .status(200)
    .json(
        new ApiResponse(200,timetableData,"Student class list")
    )
})
export {
    studetTimetableByClass
}