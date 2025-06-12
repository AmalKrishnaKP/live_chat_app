import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageSkeleton from '../skeleton/MessageSkeleton'
const ChatContainer = () => {
  const {messages,isMessageLoading,getMessages,selectedUser}=useChatStore()
  useEffect(()=>{
      getMessages(selectedUser._id)
  },[selectedUser])
  // console.log(selectedUser);
  
  

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
  return (
    <div className="flex-1 flex flex-col overflow-auto justify-between">
      <ChatHeader />
      <div className='h-full shadow-2xl'>message..</div>
      <ChatInput />
    </div>
  )
}

export default ChatContainer