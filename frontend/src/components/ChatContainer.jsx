import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageSkeleton from '../skeleton/MessageSkeleton'
import { authStore } from '../store/authStore'
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
                
                <div className="chat-header">
                  {selectedUser.fullName}
                </div>
                <div className="chat-bubble p-2 bg-primary text-primary-content rounded-xl">
                  {mesg.image?
                    <img 
                      src={mesg.image} 
                      alt="" 
                      className='h-30 rounded-md '
                    />
                    :null
                  } 
                  {mesg.text}
                  <div className='flex justify-start'>
                    <time className="text-xs opacity-50">{mesg.updatedAt}</time>

                  </div>
                </div>
              </div>
              : 
              <div className="chat chat-end m-5">
                
                <div className="chat-header ">
                  {authUser.fullName}
                  
                </div>
                <div className=" chat-bubble p-2 bg-primary text-primary-content rounded-xl">
                  {mesg.image?
                  <img 
                    src={mesg.image} 
                    alt="" 
                    className='h-30 rounded-md '
                  />
                  :null
                  } 
                  {mesg.text}
                  <div className='flex justify-end'>
                    <time className="text-xs opacity-50">{mesg.updatedAt}</time>

                  </div>
                </div>
                
              </div>
          )
          )
        }
      </div>
      {/* <div className='overflow-x-auto'>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble">I hate you!</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble">I hate you!</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>
      </div> */}
      <ChatInput />
    </div>
  )
}

export default ChatContainer