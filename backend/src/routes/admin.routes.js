import { Router } from "express";
import { loginAdmin, logoutAdmin } from "../controllers/admin/admin.controller.js";
import { verfyAdminJWT } from "../middlewares/auth.middleware.js";
import { addStudent, deleteStudent, getClassNames, getStudentByClass, getStudentDetails, totalStudentCount } from "../controllers/admin/student/student.admin.controller.js";
import { getAttendanceByClass, getAttendanceSummaryPDF, studentAttendanceSummary } from "../controllers/admin/student/studentAttendance.admin.controller.js";
import { getTeacherCount } from "../controllers/admin/teacher/teacher.admin.controller.js";
import { AttendanceEligibilityByClass, AttendanceEligibilityByGender, studentByGender } from "../controllers/admin/student/student.data.admin.controller.js";
import { studetTimetableByClass } from "../controllers/admin/student/student.timetable.admin.controller.js";


const router = Router()
router.route("/login").post(loginAdmin)
router.route("/logout").post(verfyAdminJWT,logoutAdmin)
router.route("/student/addStudent").post(addStudent)
router.route("/student/getClass").post(getClassNames)
router.route("/student/getStudent").post(getStudentByClass)
router.route("/student/getStudentDetails").post(getStudentDetails)
router.route("/student/deleteStudent").post(deleteStudent)
router.route("/student/getAttendanceByClass").post(getAttendanceByClass)
router.route("/student/generateAttendancePdf").post(getAttendanceSummaryPDF)
router.route("/student/getStudentCount").post(totalStudentCount)
router.route("/teacher/getTeacherCount").post(getTeacherCount)
router.route("/student/data/studentByGender").post(studentByGender)
router.route("/student/data/studentAttendanceByGender").post(AttendanceEligibilityByGender)
router.route("/student/data/studentAttendanceEligibilityByClass").post(AttendanceEligibilityByClass)
router.route("/student/timeTableByClass").post(studetTimetableByClass)
export default router