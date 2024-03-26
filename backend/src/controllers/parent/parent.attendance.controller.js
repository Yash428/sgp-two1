import { ApiError, ApiResponse } from "../../utils/index.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import { connectDb } from "../../db/index.js"
import {QueryTypes, Sequelize} from "sequelize"
import {Student} from "../../models/student.models.js"

const studentAttendanceSummary = asyncHandler(async(req,res)=>{
    const {parentId} = req.body
    const student = await Student.findOne({where: {parent_id:parentId}})
    console.log(student);
    const subjectList = await getSubjectList(student.student_class)
    let attList = []
    let total=0;
    let present =0;
    for(let i=0;i<subjectList.length;i++){
        let subjectId = subjectList[i].sub_id
        let tot = await getTotalCount(student.student_id,subjectId);
        let pre = await getPresentCount(student.student_id,subjectId);
        total = total+tot
        present = present + pre
        let subjectWiseAttendance = (tot===0)?0:Math.round((pre*100)/tot)
        attList.push({subjectId,tot,pre,subjectWiseAttendance})
    }
    let subjectId = "Overall"
    let overallAttendance = (total===0)?0:Math.round((present*100)/total)
    attList.push({subjectId,tot:total,pre:present,overallAttendance})
    return res
    .status(200)
    .json(
        new ApiResponse(200,attList,"Attendance")
    );
})

const getTotalCount = async(studentId,studentSubjectId) =>{
    const sequelize= await connectDb()
    const result = await sequelize.query("select count(a.is_present) as p from timetable as tt inner join att_par as a1 on a1.tt_id  = tt.tt_id inner join att_table as a on a.att_p_id  = a1.att_p_id where (a.st_id =  ? and tt.sub_id= ?) order by tt.sub_id;",{
        replacements: [studentId,studentSubjectId],
        type: QueryTypes.SELECT
    })
    return result[0].p
}

const getPresentCount = async(studentId,studentSubjectId)=>{
    const sequelize= await connectDb()
    const result = await sequelize.query("select count(a.is_present) as p from timetable as tt inner join att_par as a1 on a1.tt_id  = tt.tt_id inner join att_table as a on a.att_p_id  = a1.att_p_id where (a.st_id =  ? and tt.sub_id= ? and a.is_present is true) order by tt.sub_id;",{
        replacements: [studentId,studentSubjectId],
        type: QueryTypes.SELECT
    })
    return result[0].p
}

const getSubjectList = async(studentClass)=>{
    console.log(studentClass);
    const sequelize= await connectDb()
    const result = await sequelize.query("select distinct tt.sub_id from timetable as tt where sub_class=? and(tt.sub_id!='BR' and tt.sub_id!='NA') ",{
        replacements: [studentClass],
        type: QueryTypes.SELECT
    })
    return result
}

export {
    studentAttendanceSummary,
    getSubjectList
}