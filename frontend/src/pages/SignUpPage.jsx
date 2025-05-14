import React from 'react'
import { authStore } from '../store/AuthStore'
import { Mail, MessageSquare, User } from 'lucide-react'

export default function SignUpPage() {
  const [showPassword,setShowPassword]=React.useState(false)
  const [formData,setFormData]=React.useState({
    fullname:"",
    email:"",
    password:""
  })
  const {isSigningUp,signup}=authStore()

  const validateForm =()=>{}
  const handleInput=(e)=>{
    e.preventDefault()
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
          <form onSubmit={handleInput} className="space-y-6">
            <div className="form-control">

              <label htmlFor="" className="label">
                <span className="font-medium">Full Name</span>
              </label>
              <div className="relative">
                <input 
                  className='input input-border  w-full pl-10'
                  type="text" 
                  placeholder='join'
                  value={formData.fullname}
                  onChange={(e)=>setFormData({...formData,fullname:e.target.value})} />
                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                  <User className='size-6 test-base-content/40 overflow-y-visible'/>
                </div>
              </div>                                                     
            </div>
            <div className="form-control">

              <label htmlFor="" className="label">
                <span className="font-medium">Email</span>
              </label>
              <div className="relative">
                
                <input 
                  className='input input-border  w-full pl-10'
                  type="text" 
                  placeholder='abcd@gmail.com'
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})} />
                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                  <Mail className='size-6 test-base-content/40 overflow-y-visible'/>
                </div>
              </div>                                                     
            </div>
          </form>          
        </div>
      </div>
    </div>
  )
}
