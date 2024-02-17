import { ApiError, ApiResponse } from "../../../utils/index.js"
import {asyncHandler} from "../../../utils/asyncHandler.js"
import { connectDb } from "../../../db/index.js"
import { QueryTypes } from "sequelize"

const getClass =asyncHandler (async(req,res)=>{
    const sequelize= await connectDb()
    const result = await sequelize.query("select *from school where class_no!='NA'",{
        type: QueryTypes.SELECT
    })
    console.log(result);
    if(!result){
        throw new ApiError(400, "Invalid User")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Student class list")
    )
})

export {
    getClass,
}