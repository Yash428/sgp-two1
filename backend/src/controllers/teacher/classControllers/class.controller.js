// import { ApiError, ApiResponse } from "../../utils/index.js"
// import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../../db/index.js"
import { QueryTypes } from "sequelize"

const getClass =async ()=>{
    const sequelize= await connectDb()
    const result = await sequelize.query("select *from school where class_no!='NA'",{
        type: QueryTypes.SELECT
    })
    console.log(result);
    return result
}

export {
    getClass,
}