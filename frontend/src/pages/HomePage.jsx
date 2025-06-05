import React from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected'
import { Sidebar } from 'lucide-react'
export default function HomePage() {

  const {selectedUser }=useChatStore()
  return (
    <div className='h-screen bg-base-200'  >
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl  h-[calc(100vh-8rem)]">
          <div className="flex overflow-hidden h-full rounded-lg">
            <Sidebar />
            {!selectedUser?<NoChatSelected />: < ChatContainer /> }
          </div>
        </div>
      </div>
    </div>
  )
}
