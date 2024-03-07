import { Router } from "express";
import { loginAdmin, logoutAdmin } from "../controllers/admin/admin.controller.js";
import { verfyAdminJWT } from "../middlewares/auth.middleware.js";
import { addStudent, deleteStudent, getClassNames, getStudentByClass, getStudentDetails } from "../controllers/admin/student/student.admin.controller.js";
import { getAttendanceByClass, getAttendanceSummaryPDF } from "../controllers/admin/student/studentAttendance.admin.controller.js";
import { generateExcel } from "../Excel/index.js";


const router = Router()
router.route("/login").post(loginAdmin)
router.route("/logout").post(verfyAdminJWT,logoutAdmin)
router.route("/student/addStudent").post(addStudent)
router.route("/student/getClass").post(getClassNames)
router.route("/student/getStudent").post(getStudentByClass)
router.route("/student/getStudentDetails").post(getStudentDetails)
router.route("/student/deleteStudent").post(deleteStudent)
router.route("/student/getAttendanceByClass").post(getAttendanceByClass)
router.route("/generateExcel").post(generateExcel)
router.route("/student/generateAttendancePdf").post(getAttendanceSummaryPDF)
export default router