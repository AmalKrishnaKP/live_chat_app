import { Image, Send, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'

const ChatInput = () => {
  const fileInputRef=useRef(null)
  const [text,setText]=useState("")
  const [imagePreview,setImagePreview]=useState(null)
  const {sendMessage}=useChatStore()



  const handleImageChange=(e)=>{
    e.preventDefault()
    const f=new FileReader()
    if(e.target.files[0]){
      f.readAsDataURL(e.target.files[0])
      f.onload=()=>{
        setImagePreview(f.result)
      }
    }
  }
  
  
  const handleMessageSend=async(e)=>{
    e.preventDefault()
    // console.log(text);
    if (!text && !imagePreview) return;
    try {
      await sendMessage({
        text:text,
        image:imagePreview,
      })
      // console.log("input");
      
      setImagePreview(null)
      setText("")
      if(fileInputRef.current)fileInputRef.current.value=""
      
    } catch (error) {
      console.log(error);
      
    }

    
  }
  
  const removeImage=()=>{
      setImagePreview(null)
  }
  
  return (
    <div className='w-full p-2 shadow-2xl'>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center hover:cursor-pointer"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleMessageSend} className='flex felx-row'>
        <div className='w-full flex'>

          <input
            type="text" 
            name='mesg'
            // disabled={imagePreview}
            value={text} 
            className="border border-y-primary border-x-primary rounded-sm w-full p-2 mr-2 text-secondary-content" 
            onChange={(e)=>setText(e.target.value)}
            placeholder='Type a message....'
            />
          <input 
            ref={fileInputRef}
            accept='image/*'
            type="file" 
            name="file"
            className='hidden'
            onChange={(e)=>handleImageChange(e)}
          />
          <button
            className={`  btn btn-circle
                        ${imagePreview?"text-emerald-500":""}
              `}
            type='button'
            onClick={()=>fileInputRef.current.click()}
            >
            <Image 
              className=' hover:cursor-pointer size-5' 
            />
          </button>
        </div>
        <button 
          className='btn btn-circle '
          disabled={!text && !imagePreview}
          onClick={()=>{console.log("submit");
          }}
          type="submit">
          <Send className=' hover:cursor-pointer size-5' />
        </button>
      </form>

    </div>
  )
}

export default ChatInput