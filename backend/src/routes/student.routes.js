import { Router } from "express";
import { loginStudent,updateStudentPasswordWithOld,getCurrentUser } from "../controllers/student/student.controller.js";

const router = Router()

router.route("/login").post(loginStudent)
router.route("/updatePassword").post(updateStudentPasswordWithOld)
router.route("/getCurrent").post(getCurrentUser)
export default router