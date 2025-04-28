import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import { authStore } from './store/AuthStore'
import {Loader} from "lucide-react"


export default function App() {

  const{authUser,checkAuth,ischeckingAuth}=authStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  
  if (ischeckingAuth && !authUser)return(
    <div className='flex justify-center items-center h-screen'>
      <Loader className='animate-spin' />
    </div>
  )
  

  return (
    <div className='text-red-400'>
      <Navbar/> 
      
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}
