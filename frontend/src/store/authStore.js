
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";


export const authStore=create((set)=>({
    authUser: null,
    isSigningUp:false,
    isLoggingUp:false,
    ischeckingAuth: true,

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

    }

}))