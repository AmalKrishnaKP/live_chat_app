import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from '../skeleton/SidebarSkeleton'
import { Users } from 'lucide-react'
import { authStore } from '../store/authStore'

const Sidebar = () => {
  const {users,selectedUser,isUserLoading,getUsers,setSelectedUser}=useChatStore()
  const {onlineUsers}=authStore()
  useEffect(()=>{
    getUsers()
  },[getUsers])
  if (isUserLoading)
    return <SidebarSkeleton />
  // console.log(users);
  
  return (
      <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
        <div className="border-b border-base-300 w-full lg:p-5">
          <div className="flex items-center gap-2 ml-4 mt-4 lg:ml-0 lg:mt-0 ">
            <Users />
            <span className="font-medium hidden lg:block">Contacts</span>

          </div>
          <div className="overflow-y-auto w-full p-3">
            {
              users.map((user)=>(
                <button
                  key={user._id}
                  onClick={()=>setSelectedUser(user)}
                  className={`
                    w-full flex items-center gap-3 rounded-2xl
                    hover:bg-base-300 hover:rounded-2xl transition-colors hover:cursor-pointer
                    ${selectedUser?._id==user._id?"bg-base-300 ring-1 ring-base-300":""}
                  `}
                >
                  <div className="relative mx-auto lg:mx-0">
                    <img src={user.profilePic? user.profilePic:"/avatar.png "}
                      alt={user.fullName} 
                      className='object-cover rounded-full size-12'
                    />
                    {onlineUsers.includes(user._id)&&(
                      <span 
                        className='relative bottom-0 right-0 size-3 bg-green-500
                        rounded-full ring-2 ring-zinc-900'
                      />
                    )}
                  </div>
                  <div className="hidden lg:block text-left min-w-0">
                    <div className="font-medium truncate">{user.fullName}</div>
                    <div className="text-sm text-shadow-zinc-400">
                      {onlineUsers.includes(user)?"Online":"Offline"}
                    </div>
                  </div>
                </button>
              ))
            }
          </div>

        </div>

      </aside>
  )
}

export default Sidebar