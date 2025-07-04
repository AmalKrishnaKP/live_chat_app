import mongoose from "mongoose";

const messageSchema= new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true,
        },
        reciverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true,
        },
        text:{
            type:String,
        },
        image:{
            type:String,
        }
    },
    {timestamps:true}
)

const Mesg= mongoose.model("Mesg",messageSchema,"Mesg")

export {Mesg}