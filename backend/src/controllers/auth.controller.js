import User from "../models/user.model.js"


export const login=(req,res)=>{
    res.send("login")
}

export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body

    try {
        if (password.length<6)
            res.status(400).send({message:"Password must be atleast 6 charactors"})
        const user= await User.findOne({email})

        if (user)
            res.status(400).send({message:"email already exists"})
    } catch (error) {
        
    }
}

export const logout=(req,res)=>{
    res.send("logout")
}