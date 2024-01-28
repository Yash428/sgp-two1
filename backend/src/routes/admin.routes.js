import { Router } from "express";
import { loginAdmin, logoutAdmin } from "../controllers/admin/admin.controller.js";
import { verfyAdminJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/login").post(loginAdmin)
router.route("/logout").post(verfyAdminJWT,logoutAdmin)

export default router