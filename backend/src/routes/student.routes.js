import { Router } from "express";
import { loginStudent,updateStudentPasswordWithOld,getCurrentUser, studentLogout,addProfilePicture,updateProfilePicture} from "../controllers/student/student.controller.js";
import {getStudentTimetable} from "../controllers/student/student.timetable.controller.js"
import { studentAttendanceSummary } from "../controllers/student/student.attendance.controller.js";
import {verifyStudentJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import { printHello } from "../controllers/student/student.controller.js";
const router = Router()

router.route("/login").post(loginStudent)
router.route("/updatePassword").post(updateStudentPasswordWithOld)
router.route("/getCurrent").post(getCurrentUser)
router.route("/logout").post(verifyStudentJWT,studentLogout)
router.route("/timetable").post(verifyStudentJWT,getStudentTimetable)
router.route("/getAttendance").post(verifyStudentJWT,studentAttendanceSummary)
router.route("/logout").post(verifyStudentJWT,studentLogout)
router.route("/addProfilePicture").post(verifyStudentJWT,upload.single("profileImage"),addProfilePicture)
router.route("/updateProfilePicture").post(verifyStudentJWT,upload.single("profileImage"),updateProfilePicture)
router.route("/").get(printHello)
export default router