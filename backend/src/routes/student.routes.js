import { Router } from "express";
import { loginStudent,updateStudentPasswordWithOld,getCurrentUser, studentLogout } from "../controllers/student/student.controller.js";
import {getStudentTimetable} from "../controllers/student/student.timetable.controller.js"
import { studentAttendanceSummary } from "../controllers/student/student.attendance.controller.js";
import {verifyStudentJWT} from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/login").post(loginStudent)
router.route("/updatePassword").post(updateStudentPasswordWithOld)
router.route("/getCurrent").post(getCurrentUser)
router.route("/logout").post(verifyStudentJWT,studentLogout)
router.route("/timetable").post(getStudentTimetable)
router.route("/getAttendance").post(studentAttendanceSummary)
router.route("/logout").post(studentLogout)
export default router