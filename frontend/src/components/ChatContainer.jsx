import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageSkeleton from '../skeleton/MessageSkeleton'
import { authStore } from '../store/authStore'
import { timeconvert } from '../lib/utils.js'
const ChatContainer = () => {
  const {messages,isMessageLoading,getMessages,selectedUser}=useChatStore()
  const {authUser}=authStore()
  const scrollref=useRef(null)
  useEffect(()=>{
      getMessages(selectedUser._id)
  },[selectedUser])
  // console.log(selectedUser);
  useEffect(()=>{
    if(scrollref.current)
    {
      scrollref.current.scrollTop = scrollref.current.scrollHeight
      console.log(scrollref.current.scrollHeight);
      
    }
  },[scrollref.current])
  
  if (messages){
    console.log(`${authUser}`);
    
  }
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

      
      <div className='overflow-x-auto' ref={scrollref}>
        {
          messages.map((mesg)=>(
            
              mesg.senderId==selectedUser._id?
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="profilepic"
                      src={selectedUser.profilePic?selectedUser.profilePic:"/avatar.png"}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {selectedUser.fullName}
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
              
              : 
              <div className="chat chat-end m-5">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="profilepic"
                      src={authUser.profilePic?authUser.profilePic:"/avatar.png"}
                      
                    />
                  </div>
                  
                </div>
                <div className="chat-header ">
                  {authUser.fullName}
                  
                </div>
                <div className=" chat-bubble p-2 bg-primary text-primary-content rounded-xl">
                  {mesg.image?
                  <img 
                    src={mesg.image} 
                    alt="" 
                    className='h-40 rounded-md '
                  />
                  :null
                  } 
                  {mesg.text}
                  <div className='flex justify-end'>
                    <time className="text-[10px] opacity-50">{timeconvert(mesg.updatedAt)}</time>
                  
                  </div>
                </div>
                
              </div>
          )
          )
        }
        <div></div>
      </div>
      
      <ChatInput />
    </div>
  )
}

export default ChatContainer