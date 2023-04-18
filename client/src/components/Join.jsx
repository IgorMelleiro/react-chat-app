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
    <div className='w-3/12 flex flex-col justify-center items-center bg-white rounded-lg py-8 px-4'>
      <h1 className='text-2xl font-semibold text-indigo-900'>Join the chat real time chat!</h1>
      <div className='w-6/12 flex flex-col justify-center items-center space-y-6 mt-6'>
        <input
          ref={userNameRef}
          placeholder='User name'
          className='peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-sky-400 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
        />
        <button
          className='inline-flex items-center justify-center uppercase px-6 py-3 font-medium tracking-wide text-white text-sm transition duration-200 bg-indigo-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none'
          onClick={() => handleSubmit()}
        >
          Join in
        </button>
      </div>
    </div>
  )
}

export default Join