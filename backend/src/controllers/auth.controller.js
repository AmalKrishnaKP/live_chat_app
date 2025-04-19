import {User} from "../models/user.model.js"

import { generateTocken } from "../lib/utils.js"

import bcrypt from 'bcryptjs'
import { urlencoded } from "express"


export const login=async (req,res)=>{
    const {email,password}=req.body
    try {
        if(!email || !password)
            {
               return res.status(400).json({message:"enter all credentials"})
            }
            const user= await User.findOne({email})
            if(!user)
            {
                return res.status(400).json({message:"invalied user"})
            }
            const p_correct=await bcrypt.compare(password,user.password)
            if(!p_correct)
            {
                return res.status(400).json({message:"invalied password"})
            }
            generateTocken(user._id,res)

            return res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profPic:user.profilePic,

            })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:"server side error occured"})
        
    }

}

export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body

    try {

        if (!fullName || !email || !password)
            res.status(400).json({message:"require all fileds"})

        if (password.length<6)
            res.status(400).json({message:"Password must be atleast 6 charactors"})
        const user= await User.findOne({email})

        if (user)
            res.status(400).json({message:"email already exists"})
        
        const salt=await bcrypt.genSalt(10)

        const h_password=await bcrypt.hash(password,salt)

        const newUser=new User({
            fullName,
            email,
            password:h_password,
        })

        if(newUser){
            generateTocken(User._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(400).json({message:"invalid user info"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"something wrong in the server"})
        
    }
}

export const logout=async(req,res)=>{
    try {
        await res.cookie("jwt_token","",{maxAge:0})

        res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"error occured in server"})
        
    }   
}
export const update=async(req,res)=>{
    try {
        const user=req.user
        // console.log(id);
        
        res.status(200).json({user:user})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"server error occured"})
        
    }
}