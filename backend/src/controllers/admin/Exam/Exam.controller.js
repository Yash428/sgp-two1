import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "../../../utils/index.js";
import { connectDb } from "../../../db/index.js";

const addExamTimeTable = asyncHandler(async(req,res)=>{
    const sequelize = await connectDb()
    const {exam_date,subject,s_class,e_cat,supervisor,examinor} = req.body
    const query = "INSERT INTO exam(exam_date,subject,class, e_cat) VALUES (?,?,?,?);"
    const r1 = await sequelize.query(query,{
        replacements: [exam_date,subject,s_class,e_cat],
        type: QueryTypes.INSERT
    })
    if(!r1){
        throw new ApiError(400, "Failed to add exam time table")
    }
    const query1 = "SELECT exam_id FROM exam WHERE exam_date =? AND subject =? AND class =? AND e_cat =?;"
    const r2 = await sequelize.query(query1,{
        replacements: [exam_date,subject,s_class,e_cat],
        type: QueryTypes.SELECT
    })
    const query2 = "INSERT INTO exam_roles(exam_id,supervisor,examinor) VALUES (?,?,?);"
    const r3 = await sequelize.query(query,{
        replacements: [r2[0].exam_id,supervisor,examinor],
        type: QueryTypes.INSERT
    })
    if(!r3){
        throw new ApiError(400, "Failed to add exam time table")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Exam time table added")
    )
})

export{
    addExamTimeTable
}