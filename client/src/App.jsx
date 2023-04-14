import { useState } from 'react'
import './App.css'
import Join from './components/Join'
import Chat from './components/Chat'

function App() {
  const [chatVisibility, setChatVisibility] = useState(0)
  const [socket, setSocket] = useState(null)
  return (
    <div className="App">
      {
        chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility}/>
      }
    </div>
  )
}

export default App
