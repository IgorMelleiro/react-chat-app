import React, {useRef, useState, useEffect} from 'react'

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
    <div>
      <h1>Chat</h1>
      {
        messageList.map((message, index) => ( // parenteses to render
          <p key={index}>
            {message.author}: {message.text}
          </p>
        ))
      }
      <input ref={messageRef} type='text' placeholder='Message' />
      <button onClick={() => handleSubmit()}>Send</button>
    </div>
  )
}

export default Chat