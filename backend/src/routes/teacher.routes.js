import { Router } from "express";
import { loginTeacher, logoutTeacher, updateTeacherPassword } from "../controllers/teacher/teacher.controller.js";
import{teacherTimeTable} from "../controllers/teacher/teacher.timetable.controller.js"
import { getStudentDetails, getStudentListByClass, getStudentPasswordByClass } from "../controllers/teacher/editStudentDatabase/studentDB.controller.js";
import { getClass } from "../controllers/teacher/classControllers/class.controller.js";
import { verifyTeacherJWT } from "../middlewares/auth.middleware.js";
import { addAttendceEntry, getAllPendingAttendance, getStudentsByAttPId, lectureDataByAttPId,getStudentIdsByAttPId } from "../controllers/teacher/studentAttendance.controller.js";
const router  = Router()

router.route("/login").post(loginTeacher)
router.route("/logout").post(verifyTeacherJWT,logoutTeacher)
router.route("/updatePassword").post(verifyTeacherJWT,updateTeacherPassword)
router.route("/timetable").post(verifyTeacherJWT,teacherTimeTable)
router.route("/students/password").post(verifyTeacherJWT,getStudentPasswordByClass)
router.route("/students/studentList").post(verifyTeacherJWT,getStudentListByClass)
router.route("/students/class").post(verifyTeacherJWT,getClass)
router.route("/students/attendance").post(verifyTeacherJWT,getAllPendingAttendance)
router.route("/students/fillAttendance").post(verifyTeacherJWT,addAttendceEntry)
router.route("/students/getAllStudentsByAttPId").post(verifyTeacherJWT,getStudentsByAttPId)
router.route("/students/getLectureData").post(verifyTeacherJWT,lectureDataByAttPId)
router.route("/students/getStudentIdByAttPId").post(verifyTeacherJWT,getStudentIdsByAttPId)
router.route("/students/getStudentData").post(verifyTeacherJWT,getStudentDetails)
router.route("/students/getStudentPassword").post(verifyTeacherJWT,getStudentPasswordByClass)
export default router