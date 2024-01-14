import { connectDb } from "./db/index.js";
import express from "express"
import { app } from "./app.js";

app.get('/',(req,res)=>{
    res.send("Heyy")
})


connectDb()
.then(()=>{
    app.listen(8002,()=>{
        console.log("server on 8002");
    })
})
.catch((err)=>{
    console.log("Db err ",err);
})

