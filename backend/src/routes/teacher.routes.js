import { Router } from "express";
import { loginTeacher, updateTeacherPassword } from "../controllers/teacher/teacher.controller.js";
import{teacherTimeTable} from "../controllers/teacher/teacher.timetable.controller.js"
import { getStudentListByClass, getStudentPasswordByClass } from "../controllers/teacher/editStudentDatabase/studentDB.controller.js";
//import{getStudentPasswordByClass} from "../controllers/teacher/editStudentDatabase/studentDB.controller.js"
const router  = Router()

router.route("/login").post(loginTeacher)
router.route("/updatePassword").post(updateTeacherPassword)
router.route("/timetable").post(teacherTimeTable)
router.route("/students/password").post(getStudentPasswordByClass)
router.route("/students/studentList").post(getStudentListByClass)
export default router