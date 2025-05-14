import React, { useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import { authStore } from './store/AuthStore'
import {Loader} from "lucide-react"  // lucide for icons


export default function App() {

  const{authUser,checkAuth,ischeckingAuth}=authStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser);
  
  
  if (ischeckingAuth && !authUser)return(
    <div className='flex justify-center items-center h-screen'>
      <Loader className='animate-spin' />
    </div>
  )
  

  return (
    <div >
      <Navbar/> 
      
      <Routes>
        <Route path='/' element={authUser?<HomePage/>: <Navigate to="/login"/>}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
        <Route path='/profile'  element={authUser?<ProfilePage/>: <Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}
