import {DataTypes, Sequelize} from "sequelize"
import { connectDb } from "../db/index.js"
const sequelize = await connectDb()

const Parent = sequelize.define('parent',{
    parent_id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    father_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    father_no:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mother_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mother_no:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
    refresh_token: {
        type:DataTypes.TEXT,
        allowNull:true
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"parent"
    }
},{
    timestamps: false,
    tableName:'parent'
})

export {
    Parent
}