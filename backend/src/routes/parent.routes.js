import { Router } from "express";
import { timetable } from "../controllers/parent/parent.timetable.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { studentAttendanceSummary } from "../controllers/parent/parent.attendance.controller.js";

const router= Router()

router.route("/timetable").post(verifyJWT,timetable)
router.route("/attendance").post(studentAttendanceSummary)

export default router