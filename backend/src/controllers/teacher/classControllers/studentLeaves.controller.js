import { ApiError, ApiResponse } from "../../../utils/index.js"
import {asyncHandler} from "../../../utils/asyncHandler.js"
import { connectDb } from "../../../db/index.js"
import { QueryTypes } from "sequelize"

const getPendingStudentApplication = asyncHandler(async(req,res)=>{
    const {teacher_class} = req.body
    const sequelize = await connectDb()
    const query = "select s.sl_id,s.student_id,st.student_name,s.reason,s.start_date,s.end_date,s.d_name,s.d_no,s.d_city,s.d_email,s.status, sc.class_no from student_leaves as s "+
    "inner join student as st "+
    "on s.student_id = st.student_id "+
    "inner join school as sc "+
    "on st.student_class=sc.class_no "+
    "where st.student_class = ? and s.status='pending';"

    const allpendingLeaves = await sequelize.query(query,{
        replacements: [teacher_class],
        type: QueryTypes.SELECT
    })
    console.log(allpendingLeaves);
    if(!allpendingLeaves){
        throw new ApiError(400, "Student leaves not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, allpendingLeaves,"Student pending leaves")
    )
})

const getLeaveDataBySLId = asyncHandler(async(req,res)=>{
    const {sl_id} = req.body
    const sequelize = await connectDb()
    const query= "select *from student_leaves as sl inner join student as st on st.student_id = sl.student_id  where sl_id=?;"
    const leaveData = await sequelize.query(query,{
        replacements: [sl_id],
        type: QueryTypes.SELECT
    })
    if(!leaveData){
        throw new ApiError(400, "Student leave not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, leaveData,"Student leave data")
    )
})
const approveApplication = asyncHandler(async(req,res)=>{
    const {sl_id} = req.body
    const sequelize = await connectDb()
    const query = "update student_leaves set status='approved' where sl_id =?;"
    const result = await sequelize.query(query,{
        replacements: [sl_id],
        type: QueryTypes.UPDATE
    })
    if(!result){
        throw new ApiError(400, "Student leave not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Student leave approved")
    )
})

export{
    getPendingStudentApplication,
    getLeaveDataBySLId,
    approveApplication
}