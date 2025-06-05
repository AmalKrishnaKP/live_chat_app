import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
// import { authStore } from "./AuthStore";

export  const useChatStore=create((set)=>({
    messages:[],
    users:[],
    selectUser:null,
    isUserLoading:false,
    isMessageLoading:false,

    getUsers:async()=>{
        set({isMessageLoading:true})
        try {
            const res=await axiosInstance("/api/mesg/users")
            set({users:res.data})
            
        } catch (error) {
            toast.error(error.responce.data.messages)
        }finally{
            set({isMessageLoading:false})
        }
    },
    getMessages:async(userID)=>{
        set({isMessageLoading:true})
        try {
            const res=await axiosInstance(`/api/mesgpersonal/${userID}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.responce.data.messages)
            
        }finally{
            set({isMessageLoading:false})
        }
    },
    setSelectedUser:(selectUser)=>{set({selectUser})}
}))