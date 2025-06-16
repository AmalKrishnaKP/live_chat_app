import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { authStore } from "./authStore";
// import { authStore } from "./AuthStore";

export  const useChatStore=create((set,get)=>({
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
            console.log(res.data);
            
        } catch (error) {
            toast.error(error.responce.data.messages)
            
        }finally{
            set({isMessageLoading:false})
        }
    },
    sendMessage:async(mesgData)=>{
        const {selectedUser,messages}= await get()
        
        console.log(`senderid=${selectedUser._id}`);
        
        try {
            const res=await axiosInstance.post(`/api/mesg/send/${selectedUser._id}`,mesgData)
            set({messages:[... messages,res.data]})
            // console.log("store");
            
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
    },
    subscribMesg:()=>{
        const {selectedUser}=get()
        if (!selectedUser) return;

        const socket=authStore.getState().socket
        socket.on("newMessage",(newMsg)=>{
            if (newMsg.senderId==get().selectedUser._id)
                return set({messages:[... get().messages,newMsg,]})
        })

    },
    unSubscribMesg:()=>{
        const socket=authStore.getState().socket
        socket.off("newMessage")
    },
    newUseradder:()=>{                           
        const socket=authStore.getState().socket
        
        socket.on("newSignUps",(newUser)=>{
            set({users:[... get().users,newUser]})
        })
        
    },
    stopUseradd:()=>{                            

        const socket=authStore.getState().socket
        socket.off("newSignUps")
    }
}))