import {Sequelize} from "sequelize"

const connectDb = async ()=>{
    try {
        const sequelize= new Sequelize('school','root','Blu@3top',{
            host: "localhost",
            dialect: 'mysql'
        })
        return sequelize
    } catch (error) {
        console.log(error);
    }
    return null;
}

export {
    connectDb
}