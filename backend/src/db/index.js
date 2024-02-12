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

// const connectDb = async ()=>{
//     try {
//         const sequelize= new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD ,{
//             host: process.env.DATABASE_HOST,
//             dialect: 'mysql'
//         })
//         return sequelize
//     } catch (error) {
//         console.log(error);
//     }
//     return null;
// }

export {
    connectDb
}