import {asyncHandler} from '../../../utils/asyncHandler.js';
import {ApiError, ApiResponse} from '../../../utils/index.js'
import { QueryTypes } from 'sequelize'
import { connectDb } from '../../../db/index.js'
const getExamTimeTable = asyncHandler(async(req,res)=>{
    const sequelize = await connectDb()
    const examTimeTable = await sequelize.query("select exam.exam_date,exam.subject,exam.class,exam_cat.type,exam_cat.category from exam "+
    "inner join exam_cat " +
    "on exam.e_cat = exam_cat.ec_id "+
    "order by exam.class,exam.exam_date; ",{
        type: QueryTypes.SELECT
    })
    if(!examTimeTable.length){
        throw new ApiError(400, "Exam time table not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, examTimeTable,"Exam time table")
    )
})
const getMarkEntryList = asyncHandler(async(req,res)=>{
    const {teacher_id} = req.body
    const sequelize = await connectDb()
    const query = "select *from exam as e inner join exam_roles as er on e.exam_id = er.exam_id where er.examinor = ?"
    const markEntryList = await sequelize.query(query,{
        replacements: [teacher_id],
        type: QueryTypes.SELECT
    })
    if(!markEntryList.length){
        throw new ApiError(400, "Mark entry list not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, markEntryList,"Mark entry list")
    )
})

export{
    getExamTimeTable,
    getMarkEntryList
}