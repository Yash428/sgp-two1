import {DataTypes, Sequelize} from "sequelize"
import { connectDb } from "../db/index.js"
const sequelize = await connectDb()

const Teacher = sequelize.define('teacher',{
    teacher_id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    teacher_name:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    teacher_mobile:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    teacher_mail:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    teacher_address:{
        type:DataTypes.TEXT,
        allowNull:false
    }, 
    teacher_degree:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    teacher_dob:{
        type:DataTypes.DATE,
        allowNull:false
    }, 
    teacher_gender:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    teacher_salary:{
        type:DataTypes.NUMBER,
        allowNull:false
    }, 
    teacher_password:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    teacher_adhar:{
        type:DataTypes.STRING,
        allowNull:false
    },
    teacher_bgroup:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    teacher_class:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    teacher_join_date:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    refresh_token:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"teacher"
    }
},
{
    tableName:'teacher',
    timestamps: false
})

export {
    Teacher
}