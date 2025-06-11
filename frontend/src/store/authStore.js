
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const authStore=create((set)=>({
    authUser: null,
    isSigningUp:false,
    isLoggingUp:false,
    ischeckingAuth: true,
    isUpdatingProfile:false,
    onlineUsers:[],
    checkAuth: async()=>{
        try {
            const res=await axiosInstance.get("/api/auth/check-auth")

            set({authUser:res.data})
        } catch (error) {
            console.log(error);
            
            set({authUser:null})
        }
        finally{
            set({ischeckingAuth:false})
        }
    },
    signup: async(data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post("/api/auth/signup",data)
            set({authUser:res.data})
            toast.success("Account created successfully")
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isSigningUp:false})
        }
    },
    logout: async()=>{
        try {
            const res=await axiosInstance.post("/api/auth/logout")
            set({authUser:null})
            toast.success("logout successfully")

        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    },
    login:async(data)=>{
        try {
            const res=await axiosInstance.post("/api/auth/login",data)
            set({authUser:res.data})
            toast.success("login successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/api/auth/update-profile",data)
            // console.log(res.data);
            
            set({authUser:res.data.updatedUser})
            toast.success("profile updated successfully")
            
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message);
            
        }finally{
            set({isUpdatingProfile:false})
        }

    }

}))