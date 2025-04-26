import { User } from "../models/user.model.js"

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