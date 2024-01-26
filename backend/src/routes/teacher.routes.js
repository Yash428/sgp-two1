import { Router } from "express";
import { loginTeacher, logoutTeacher, updateTeacherPassword } from "../controllers/teacher/teacher.controller.js";
import{teacherTimeTable} from "../controllers/teacher/teacher.timetable.controller.js"
import { getStudentListByClass, getStudentPasswordByClass } from "../controllers/teacher/editStudentDatabase/studentDB.controller.js";
import { getClass } from "../controllers/teacher/classControllers/class.controller.js";
import { verifyTeacherJWT } from "../middlewares/auth.middleware.js";
const router  = Router()

router.route("/login").post(loginTeacher)
router.route("/logout").post(verifyTeacherJWT,logoutTeacher)
router.route("/updatePassword").post(updateTeacherPassword)
router.route("/timetable").post(teacherTimeTable)
router.route("/students/password").post(getStudentPasswordByClass)
router.route("/students/studentList").post(getStudentListByClass)
router.route("/class").post(getClass)
export default router