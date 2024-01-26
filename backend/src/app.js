import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import studentRouter from "./routes/student.routes.js"
import teacherRouter from "./routes/teacher.routes.js"
import adminRouter from "./routes/admin.routes.js"
//declarations
app.use("/api/v1/students",studentRouter)
app.use("/api/v1/teachers",teacherRouter)
app.use("/api/v1/admin",adminRouter)

export {app}