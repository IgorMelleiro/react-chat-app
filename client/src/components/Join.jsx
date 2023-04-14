import React, {useRef} from 'react'
import io from 'socket.io-client'

const Join = ({setChatVisibility, setSocket}) => {

  const userNameRef = useRef()

  const handleSubmit = async() => {
    const userName = userNameRef.current.value
    if (!userName.trim()) return
    const socket = await io.connect('http://localhost:3001')
    socket.emit('set_username', userName)
    setSocket(socket)
    setChatVisibility(true)
  }

  return (
    <div>
      <h1>Join</h1>
      <input type='text' ref={userNameRef} placeholder='User name' />
      <button onClick={() => handleSubmit()}>Join</button>
    </div>
  )
}

export default Join