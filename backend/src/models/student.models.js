import {Sequelize} from "sequelize"
import { connectDb } from "../db"

const sequelize = await connectDb()

const Student = sequelize.define('student',{},{timestamps:false})



export default Student