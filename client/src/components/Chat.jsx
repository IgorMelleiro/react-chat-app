import React, {useRef, useState, useEffect} from 'react'
import styles from './../styles/chat';
import { AiOutlineSend } from "react-icons/ai";

const Chat = ({socket}) => {

  const messageRef = useRef()
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    // message listener
    socket.on('receive_message', data => {
      setMessageList((current) => [...current, data])
    })

    // stop message listener
    return () => socket.off('receive_message')
  }, [socket])

  const handleSubmit = () => {
    const message = messageRef.current.value
    if(!message.trim()) return

    socket.emit('message', message)
    clear()
  }

  const clear = () => {
    messageRef.current.value = ''
  }

  return (
    <div className='w-4/12 flex flex-col justify-center items-center bg-white rounded-lg p-4'>
      <h1 className='text-2xl font-semibold text-indigo-900'>Real Time Chat!</h1>
      <div className='flex flex-col overflow-y-scroll	w-full h-[550px] px-[10px]'>
        {
          messageList.map((message, index) => ( // parenteses to render
          <div className={`${styles.baseMessage} ${message.authorId === socket.id && styles.sendedMessage}`} key={index}>
            <div className="message-author"><strong>{message.author}</strong></div>
            <div className="message-text">{message.text}</div>
          </div>
          ))
        }
      </div>
      <div className='w-full flex items-end'>
        <input
          ref={messageRef}
          placeholder='Type your message'
          className='peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-sky-400 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
        />
        <AiOutlineSend className='h-6 w-6' onClick={() => handleSubmit()}/>
      </div>
    </div>
  )
}

export default Chat