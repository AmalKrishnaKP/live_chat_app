import express from 'express'

import authRouters from './routers/auth.router.js'

const app=express()

app.use("/app/auth",authRouters)

app.listen(5000,()=>{
    console.log("server listening in port number 5000");
    
})