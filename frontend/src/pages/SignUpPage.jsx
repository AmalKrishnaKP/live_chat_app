import React from 'react'
import { authStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react' 
import {Link} from 'react-router-dom'


import AuthImagePattern from '../components/AuthImagePattern.jsx'


export default function SignUpPage() {
  const [showPassword,setShowPassword]=React.useState(false)
  const [formData,setFormData]=React.useState({
    fullName:"",
    email:"",
    password:""
  })
  const {isSigningUp,signup}=authStore()

  const validateForm =()=>{
    if (!formData.fullName.trim()) return toast.error("full name is required");
    if (!formData.email.trim()) return toast.error("email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("invalied email");
    if (!formData.password) return toast.error("password is require");
    if (formData.password.length<6) return toast.error("password must be atleast 6 characters")
    
    return true;
  }
  const handleSubmit=(e)=>{

    e.preventDefault()
    const valied=validateForm()
    if (valied==true) signup(formData);

    
  }


  
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* leftside */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">

              <label htmlFor="" className="label">
                <span className="font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                  <User className='size-6 test-base-content/40 overflow-y-visible z-10' />
                </div>
                <input 
                  className='input input-border  w-full pl-10'
                  type="text" 
                  placeholder='join'
                  value={formData.fullName}
                  onChange={(e)=>setFormData({...formData,fullName:e.target.value})} />
              </div>                                                     
            </div>


            <div className="form-control">

              <label htmlFor="" className="label">
                <span className="font-medium">Email</span>
              </label>
              <div className="relative">
                
                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                    <Mail className='size-6 test-base-content/40 overflow-y-visible z-10'/>
                </div>
                <input 
                  className='input input-border  w-full pl-10'
                  type="email" 
                  placeholder='abcd@gmail.com'
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})} />
              </div>                                                     
            </div>


            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>


            <button type='submit' className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>          
        </div>
      </div>
      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}
