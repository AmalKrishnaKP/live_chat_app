import express from "express"
import {Server} from "socket.io"
import http, { createServer } from 'http'
// import { useMemo } from "react"


const app=express()
const server=createServer(app)
const io=new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
    } 
})
export function getReciverSocketID(userId){
    return userMap[userId]
}
// const getReciverSocketID=(userId)=>{
//     return 
// }

const userMap={}
io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);

    const userId=socket.handshake.query.userID
    if (userId) userMap[userId]=socket.id
    io.emit("getOnlineUsers",Object.keys(userMap))
    
    socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.id);
        delete userMap[userId]
        io.emit("getOnlineUsers",Object.keys(userMap))
        
    })
    
})

export {app,server,io}
