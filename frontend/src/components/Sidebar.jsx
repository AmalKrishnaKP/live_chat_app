import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from '../skeleton/SidebarSkeleton'
import { Users } from 'lucide-react'
import { authStore } from '../store/authStore'

const Sidebar = () => {
  const {users,selectedUser,isUserLoading,getUsers,setSelectedUser,newUseradder,stopUseradd}=useChatStore()
  const {onlineUsers}=authStore()
  console.log(onlineUsers);
  
  useEffect(()=>{
    getUsers()
    newUseradder()            
    return ()=> stopUseradd() 
  },[getUsers])
  if (isUserLoading)
    return <SidebarSkeleton />
  // console.log(users);
  
  return (
      <aside className='h-full w-20 md:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
        <div className="border-b border-base-300 w-full lg:p-5">
          <div className="flex items-center gap-2 ml-4 mt-4 lg:ml-0 lg:mt-0 ">
            <Users />
            <span className="font-medium hidden md:block">Contacts</span>

          </div>
          <div className="overflow-y-auto w-full p-3">
            {
              users.map((user)=>(
                <button
                  key={user._id}
                  onClick={()=>setSelectedUser(user)}
                  className={`
                    w-full flex items-center gap-3 rounded-2xl
                    hover:bg-base-300  transition-colors hover:cursor-pointer
                    ${selectedUser?._id==user._id?"bg-base-300 ring-1 ring-base-300":""}
                  `}
                >
                  <div className="relative mx-auto md:mx-0 overflow-clip">
                    <img src={user.profilePic? user.profilePic:"/avatar.png "}
                      alt={user.fullName} 
                      className='object-cover rounded-full size-12'
                    />
                    {onlineUsers.includes(user._id)?
                      <span 
                        className='absolute bottom-0  right-0 size-2  bg-green-500
                        rounded-full ring-2 ring-zinc-900'
                      />
                      :""
                     }
                  </div>
                  <div className="hidden md:block text-left min-w-0">
                    <div className="font-medium truncate">{user.fullName}</div>
                    <div className="text-sm text-shadow-zinc-400 text-secondary-content">
                      {onlineUsers.includes(user._id)?"Online":"Offline"}
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