import { Router } from "express";
import { login, logout } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/login").post(login);
router.route("/logout").post(verifyJWT,logout);
export default router;