import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


import authRouters from './routers/auth.router.js'
import messgRouters from './routers/messg.router.js'
import { connectDB } from './lib/db.js'


const app=express()
dotenv.config() // to get the leys from the .env file like PORT,MONGOBD_URI etc..

const PORT=process.env.PORT

app.use(express.json()) // to extract "json data" from the body
app.use(cookieParser())// to  reade the cookie from the client

app.use("/app/auth",authRouters)
app.use("/app/mesg",messgRouters)

app.listen(PORT,()=>{
    console.log("server listening in port:"+PORT);
    connectDB()

    
})