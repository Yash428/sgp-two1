import { Router } from "express";
import { loginTeacher, updateTeacherPassword } from "../controllers/teacher/teacher.controller.js";

const router  = Router()

router.route("/login").post(loginTeacher)
router.route("/updatePassword").post(updateTeacherPassword)

export default router