import { useState } from 'react'
import Join from './components/Join'
import Chat from './components/Chat'

function App() {
  const [chatVisibility, setChatVisibility] = useState(0)
  const [socket, setSocket] = useState(null)
  return (
    <div className="h-screen flex justify-center items-center bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900">
      {
        chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility}/>
      }
    </div>
  )
}

export default App
