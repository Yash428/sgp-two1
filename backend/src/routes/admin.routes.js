import { Router } from "express";
import { loginAdmin, logoutAdmin } from "../controllers/admin/admin.controller.js";
import { verfyAdminJWT } from "../middlewares/auth.middleware.js";
import { addStudent } from "../controllers/admin/student/student.admin.controller.js";

const router = Router()
router.route("/login").post(loginAdmin)
router.route("/logout").post(verfyAdminJWT,logoutAdmin)
router.route("/student/addStudent").post(addStudent)
export default router