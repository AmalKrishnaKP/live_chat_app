import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageSkeleton from '../skeleton/MessageSkeleton'
import { authStore } from '../store/authStore'
import { timeconvert } from '../lib/utils.js'
const ChatContainer = () => {
  const {messages,isMessageLoading,getMessages,selectedUser,subscribMesg,unSubscribMesg}=useChatStore()
  const {authUser}=authStore()
  const currentMsg=useRef(null)
  useEffect(()=>{
      getMessages(selectedUser._id)
      subscribMesg()


      return ()=> unSubscribMesg()

  },[selectedUser,subscribMesg])
  
  useEffect(()=>{
    if(!currentMsg.current) return;
    currentMsg.current.scrollIntoView({behavior:"smooth"})
  },[currentMsg.current,messages])
  
  if (isMessageLoading)
  {
    return(
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    ) 

  }
  console.log(selectedUser);
  
  return (
    <div className="flex-1 flex flex-col overflow-auto justify-between">
      <ChatHeader />

      <div className='overflow-x-auto'>
        {
          messages.map((mesg)=>(
            <div
              className={`
                chat
                ${mesg.senderId==selectedUser._id?"chat-start":"chat-end"}
              `} 
              ref={currentMsg} 
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="profilepic"
                    src={mesg.senderId==selectedUser._id?selectedUser.profilePic || "/avatar.png":authUser.profilePic || "/avatar.png"}
                  />
                </div>
              </div>
              <div className="chat-header pr-2" >
                  {mesg.senderId==selectedUser._id?selectedUser.fullName:"You"}
              </div>
              <div className="chat-bubble p-2 bg-primary text-primary-content rounded-xl">
                {mesg.image?
                  <img 
                    src={mesg.image} 
                    alt="" 
                    className='h-40 rounded-md '
                  />
                  :null
                } 
                {mesg.text}
                <div className='flex justify-start'>
                  <time className="text-[10px] opacity-50">{timeconvert(mesg.updatedAt)}</time>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <ChatInput />
    </div>
  )
}

export default ChatContainer