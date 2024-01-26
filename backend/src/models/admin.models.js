import {DataTypes, Sequelize} from "sequelize"
import { connectDb } from "../db/index.js"
const sequelize = await connectDb()


const Admin = sequelize.define('admin',{
    admin_id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    admin_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    admin_mobile:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    admin_email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    admin_joining_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    admin_dob:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    refresh_token:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"admin"
    }
},
{
    timestamps:false,
    tableName: 'admin'
})

export {
    Admin
}