import {User} from "../models/user.model.js"

import { generateTocken } from "../lib/utils.js"

import bcrypt from 'bcryptjs'


export const login=(req,res)=>{
    res.send("login")
}

export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body

    try {

        if (!fullName || !email || !password)
            res.status(400).send({message:"require all fileds"})

        if (password.length<6)
            res.status(400).send({message:"Password must be atleast 6 charactors"})
        const user= await User.findOne({email})

        if (user)
            res.status(400).send({message:"email already exists"})
        
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

            res.status(201).send({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(400).send({message:"invalid user info"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:"something wrong in the server"})
        
    }
}

export const logout=(req,res)=>{
    res.send("logout")
}