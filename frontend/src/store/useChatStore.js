import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
// import { authStore } from "./AuthStore";

export  const useChatStore=create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,

    getUsers:async()=>{
        set({isMessageLoading:true})
        try {
            const res=await axiosInstance("/api/mesg/users")
            set({users:res.data})
            // console.log(users);
            
        } catch (error) {
            toast.error(error.response.data.messages)
        }finally{
            set({isMessageLoading:false})
        }
    },
    getMessages:async(userID)=>{
        set({isMessageLoading:true})
        try {
            const res=await axiosInstance(`/api/mesg/personal/${userID}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.responce.data.messages)
            
        }finally{
            set({isMessageLoading:false})
        }
    },
    sendMessage:async(mesgData)=>{
        const {selectedUser,messages}=get()
        try {
            const res=await axiosInstance.post(`/api/mesg/send/${selectedUser}`,mesgData)
            set({messages:[... messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    },
    setSelectedUser:(selectedUser)=>{
        
        set({selectedUser})
        // console.log(selectedUser);
        
    },
    unselectUser:()=>{
        set({selectedUser:null})
    }
}))