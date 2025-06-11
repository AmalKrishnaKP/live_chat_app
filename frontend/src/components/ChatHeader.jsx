import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { authStore } from '../store/authStore'

const ChatHeader = () => {

   const {selectedUser,unselectUser}=useChatStore() 
   const {onlineUsers}=authStore()
  return (
    <div className='flex flex-row justify-between pr-5'>
        <div className='p-2 flex flex-row shadow-2xl'>
            <div>
                <img 
                src={selectedUser.profilePic?selectedUser.profilePic:"/avatar.png"} 
                alt="img"
                className='size-12 mr-2' />
            </div>
            <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate ">{selectedUser.fullName}</div>
                <div className="text-sm text-shadow-zinc-400">
                    {onlineUsers.includes(selectedUser)?"Online":"Offline"}
                </div>
            </div>
        </div>
        <button
            className='hover:cursor-pointer'
            onClick={()=> unselectUser()}
        >
            &#10005;
        </button>
    </div>
  )
}

export default ChatHeader