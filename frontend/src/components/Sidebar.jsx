import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from '../skeleton/SidebarSkeleton'

const Sidebar = () => {
  const {users,selectUser,isUserLoading,getUsers,setSelectedUser}=useChatStore()
  const onlineUsers=[]
  useEffect(()=>{
    getUsers()
  },[getUsers])
  if (isUserLoading)
    return <SidebarSkeleton />
  return (

    <div>Sidebar</div>
  )
}

export default Sidebar