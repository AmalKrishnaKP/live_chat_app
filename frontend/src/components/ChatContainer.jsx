import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
const ChatContainer = () => {
  const {messages,isMessageLoading,getMessages,selectedUser}=useChatStore()
  useEffect(()=>{
      getMessages(selectedUser._id)
  },[selectedUser])
  // console.log(selectedUser);
  
  

  if (isMessageLoading) return <div>loading..</div>
  console.log(selectedUser._id);
  
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>message..</p>
      <ChatInput />
    </div>
  )
}

export default ChatContainer