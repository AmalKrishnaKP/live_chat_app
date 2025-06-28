import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouters from './routers/auth.router.js'
import messgRouters from './routers/messg.router.js'
import { connectDB } from './lib/db.js'
import { app, server} from './lib/socket.js'
import path, { join } from 'path'

const __dirname=path.resolve()
dotenv.config() // to get the leys from the .env file like PORT,MONGOBD_URI etc..

const PORT=process.env.PORT
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

app.use(express.json({ limit: '50mb' }));
app.use(express.json()) // to extract "json data" from the body
app.use(cookieParser())// to  reade the cookie from the client

app.use("/api/auth",authRouters)
app.use("/api/mesg",messgRouters)

if (process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

// app.all('/{*any}', (req, res, next) => {})

server.listen(PORT,()=>{
    console.log("server listening in port:"+PORT);
    connectDB()

    
})