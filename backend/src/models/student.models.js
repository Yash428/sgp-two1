import {DataTypes, Sequelize} from "sequelize"
import { connectDb } from "../db/index.js"
const sequelize = await connectDb()

const Student = sequelize.define('student',{
    student_id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull: false
    },
    student_name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_mobile:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_address:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    student_gender:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_class:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_dob:{
        type:DataTypes.DATE,
        allowNull: false
    },
    student_password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    parent_id: {
        type:DataTypes.STRING
    },
    student_adhar:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_relegion:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_caste:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_subcaste:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_m_tounge:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_bgroup:{
        type:DataTypes.STRING,
        allowNull: false
    },
    student_join_date:{
        type:DataTypes.DATE,
        allowNull: false
    },
    refresh_token:{
        type:DataTypes.STRING,
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"student"
    }
},{
    timestamps:false,
    tableName:'student'
    }
)

// generateAccessToken = function(){
//     return jwt.sign(
//         {
//             student_id:this.student_id,
//             student_name:this.student_name
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }
// generateRefreshToken = function(){
//     return jwt.sign(
//         {
//             student_id: this.student_id,
            
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }

export
{ 
    Student
}