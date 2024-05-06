import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "../../../utils/index.js";
import { connectDb } from "../../../db/index.js";
import { QueryTypes } from "sequelize";

const addExamTimeTable = asyncHandler(async(req,res)=>{
    const sequelize = await connectDb()
    const t = await sequelize.transaction()
    const {exam_date,subject,s_class,e_cat,supervisor,examinor} = req.body
    try {
        const query = "INSERT INTO exam(exam_date,subject,class, e_cat) VALUES (?,?,?,?);"
        const r1 = await sequelize.query(query,{
            replacements: [exam_date,subject,s_class,e_cat],
            type: QueryTypes.INSERT,
            transaction: t
        })
        const query1 = "SELECT exam_id FROM exam WHERE exam_date =? AND subject =? AND class =? AND e_cat =?;"
        const r2 = await sequelize.query(query1,{
            replacements: [exam_date,subject,s_class,e_cat],
            type: QueryTypes.SELECT,
            transaction: t
        })
        const query2 = "INSERT INTO exam_roles(exam_id,supervisor,examinor) VALUES (?,?,?);"
        const r3 = await sequelize.query(query,{
            replacements: [r2[0].exam_id,supervisor,examinor],
            type: QueryTypes.INSERT,
            transaction: t
        })
        t.commit()
        return res
        .status(200)
        .json(
            new ApiResponse(200,{},"Exam time table added")
        )
    } catch (error) {
        t.rollback()
        throw new ApiError(400,"Something went wrong")
    }
})

const getExamTimeTable = asyncHandler(async(req,res)=>{
    const query  = "select e.exam_id,e.exam_date,e.subject,e.class,er.supervisor,er.examinor,ec.category,ec.total_marks,ec.type from exam as e "+
    " inner join exam_roles as er on e.exam_id = er.exam_id inner join exam_cat as ec on e.e_cat = ec.ec_id "
    const sequelize = await connectDb()
    const result = await sequelize.query(query,{
        type: QueryTypes.SELECT
    })
    console.log(result)

    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Exam time table")
    )
})

const deleteFromTimeTable = asyncHandler(async(req,res)=>{
    const {exam_id} = req.body
    const sequelize = await connectDb()
    const t = await sequelize.transaction()
    try {
        const p = await sequelize.query("delete from exam_roles where exam_id =?",{
            replacements: [exam_id],
            transaction: t,
            type: QueryTypes.DELETE
        })
        const p1 = await sequelize.query("delete from exam where exam_id = ?",{
            replacements: [exam_id],
            transaction: t,
            type: QueryTypes.DELETE
        })
        t.commit()
        return res
        .status(200)
        .json(
            new ApiResponse(200,{},"success")
        )
    } catch (error) {
        t.rollback()
        throw new ApiError(400, "Failed to delete exam time table")
    }
    
})

export{
    addExamTimeTable,
    getExamTimeTable,
    deleteFromTimeTable
}