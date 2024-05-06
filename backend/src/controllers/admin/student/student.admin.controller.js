import {asyncHandler} from '../../../utils/asyncHandler.js'
import { ApiError } from '../../../utils/ApiError.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import {Student} from '../../../models/student.models.js'
import { connectDb } from '../../../db/index.js'
import { QueryTypes, Transaction } from 'sequelize'

const getClassNames = asyncHandler(async(req,res)=>{
    const sequelize = await connectDb()
    const sClassList = await sequelize.query("SELECT * FROM school WHERE class_no!='NA' ORDER BY sr_no",{
        type: QueryTypes.SELECT
    })
    if(!sClassList){
        throw new ApiError(400, "Failed to get class names")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,sClassList,"Class Names got")
    )
})

const getStudentDetails = asyncHandler(async(req,res)=>{
    const {student_id} = req.body
    const sequelize = await connectDb()
    const student = await sequelize.query("select *from student join parent on student.parent_id = parent.parent_id and student_id=? ",{
        replacements: [student_id],
        type: QueryTypes.SELECT
    })
    if(!student){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,student,"Student list")
    )
})

const getStudentByClass = asyncHandler(async(req,res)=>{
    const {student_class} = req.body
    const sequelize = await connectDb()
    const studentList = await sequelize.query('select student_id,student_name,student_class from student where student_class=?',{
        replacements: [student_class],
        type: QueryTypes.SELECT
    })
    if(!studentList){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,studentList,"Student list")
    )
})
const deleteStudent = asyncHandler(async(req,res)=>{

    const {student_id} = req.body;
    console.log(student_id);
    const sequelize = await connectDb()
    const result = await Student.destroy({where: {student_id}})
    console.log(result);
    if(!result){
        throw new ApiError(400, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Student deleted")
    )
})
const generateStudentExcel = asyncHandler(async(req,res)=>{
    
})

const addStudent = asyncHandler(async(req,res)=>{
    const studentData = req.body
    const sequelize = await connectDb()
    const t = await sequelize.transaction()
    console.log(studentData);
    if(!studentData){
        throw new ApiError(404,"Student not found")
    }

    try {
        let sClass = studentData.student_class.charAt(0)
        sClass = sClass + '%'
        const student = await sequelize.query("select student_id from student where student_class like ? order by student_id desc limit  1",{
            type: QueryTypes.SELECT,
            replacements: [sClass],
            transaction: t
        })
        let newStudentId = student[0].student_id
        newStudentId = newStudentId.replace('S','')
        newStudentId = parseInt(newStudentId)
        newStudentId = newStudentId+1
        newStudentId = 'S'+newStudentId
        console.log(newStudentId);
        const newStudentEmail = newStudentId + '@gmail.com'
        const query= "INSERT INTO student(student_id,student_name,student_mobile,student_email,student_address,student_gender,student_class,student_dob,student_adhar,student_relegion,student_caste,student_subcaste,student_m_tounge,student_bgroup,student_join_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        const newStudent = await sequelize.query(query,{
            replacements: [newStudentId,studentData.student_name,studentData.student_mobile,newStudentEmail,studentData.student_address,studentData.student_gender,studentData.student_class,studentData.student_dob,studentData.student_adhar,studentData.student_relegion,studentData.student_caste,studentData.student_subcaste,studentData.student_m_tounge,studentData.student_bgroup,studentData.student_join_date],
            type: QueryTypes.INSERT,
            transaction: t
        })
        if(!newStudent){
            t.rollback()
            throw new ApiError(400, "Failed to add student")
        }
        const pr1 = await sequelize.query("select parent_id from parent order by parent_id desc limit  1",{
            type: QueryTypes.SELECT,
            transaction: t
        })
        let newParentId = pr1[0].parent_id
        newParentId = newParentId.replace('P','')
        newParentId = parseInt(newParentId)
        newParentId = newParentId+1
        newParentId = 'P'+newParentId
        console.log(newParentId);
        const pQuery = "INSERT INTO parent (parent_id,father_name,father_no,mother_name,mother_no,password) VALUES (?, ?, ?, ?, ?, ?);"
        const parent = await sequelize.query(pQuery,{
            replacements: [newStudentId,studentData.father_name,studentData.father_no,studentData.mother_name,studentData.mother_no,studentData.student_password],
            type: QueryTypes.INSERT,
            transaction: t
        })
        if(!parent){
            t.rollback()
            throw new ApiError(400, "Failed to add parent")
        }
        await t.commit()
        return res
        .status(200)
        .json(
            new ApiResponse(200, {student_id:newStudentId, parent_id:newParentId},"Student successfully added")
        )
    } catch (error) {
        await t.rollback()
        throw new ApiError(400, "Failed to add student")
    }
    
})

const totalStudentCount = asyncHandler(async(req,res)=>{
    const sequelize = await connectDb()
    const studentCount = await sequelize.query("select count(student_id) as studentCount from student",{
        type: QueryTypes.SELECT
    })
    console.log(studentCount);
    return res
    .status(200)
    .json(
        new ApiResponse(200,studentCount,"Student count")
    )
})

export{
    addStudent,
    getClassNames,
    getStudentByClass,
    getStudentDetails,
    deleteStudent,
    totalStudentCount
}