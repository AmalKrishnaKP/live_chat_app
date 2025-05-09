import { User } from "../models/user.model.js"
import { Mesg } from "../models/message.model.js"
import cloudinary from "../lib/coudinary.js"

export const getUsersForSidebar=async(req,res)=>{
    try {
        const logedUser=req.user._id
        const filterUser=await User.find({_id:{$ne:logedUser}}).select("-password")

        res.status(200).json(filterUser)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"server side error-getuserforsidebar"})
        
        
    }
}

export const getmessages = async(req,res)=>{
    try {
        const {id: userToChatId}=await req.params
        const myId=req.user._id

        const messages=await Mesg.find({
            $or:[
                {senderId:myId,reciverId:userToChatId},
                {senderId:userToChatId,reciverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"server side error-get messages"})
    }
}

export const sendMessage=async (req,res)=>{
    try {
        const {text,image}=req.body
        const {id:reciverId}=req.params
        const senderId=req.user._id

        let imgUrl

        if(image){
            const responce= await cloudinary.uploader.upload(image)
            imgUrl=responce.secure_url
        }

        const newMesg= new Mesg(
            {
                senderId,
                reciverId,
                text,
                image:imgUrl,
            }
        )
        await newMesg.save()
// real time functionality using socket.io
        res.status(201).json(newMesg)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"server side error-sendmessage"})
        
    }
}