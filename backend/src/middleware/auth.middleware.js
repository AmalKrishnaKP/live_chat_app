import { User } from "../models/user.model.js";

import jwt from "jsonwebtoken";

export const protector=async(req,res,next)=>{
    try {
        const token= await req.cookies.jwt_token;
        if(!token){
            return res.status(400).json({message:"no tokens"})
        }

        const decode= jwt.verify(token,process.env.JWT_KEY)
        if(!decode){
            return res.status(400).json({message:"not valied token"})
        }

        // const user=await User.findOne({_id:decode.userId}).select("-password")
        const user=await User.findById(decode.userId).select("-password")
        if(!user){
            return res.status(400).json({message:"no user exist"})
        }
        // console.log(user._id);
        console.log(decode);
        
        req.user=user
        next()
    } catch (error) {
        console.log("error:"+error.message);
        res.status(500).json({message:"server side error-middleware"})
        
    }
        
}