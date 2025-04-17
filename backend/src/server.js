import express from 'express'
import dotenv from 'dotenv'



import authRouters from './routers/auth.router.js'
import { connectDB } from './lib/db.js'


const app=express()
dotenv.config()

const PORT=process.env.PORT

app.use("/app/auth",authRouters)

app.listen(PORT,()=>{
    console.log("server listening in port:"+PORT);
    connectDB()

    
})