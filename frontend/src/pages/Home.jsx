import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import ProfileComponents from '../components/profileCmponents'
import { useSelector } from 'react-redux'


const Home = () => {
  const [showProfile, setShowProfile] = useState(false)
   const userData = useSelector(store => store.login)

 
  return (

    <main className="flex h-screen bg-gray-900">
    <div className="w-[5vw] bg-gray-900 flex flex-col justify-between text-white h-screen p-2">
  {/* Top Icons */}
  <div className="flex flex-col items-center gap-6 mt-4">
    {/* Profile icon with circle */}
    
      <div onClick={() => setShowProfile(true)} className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {userData?.user?.username?.[0]}
                </div>
    

    {/* Other icons */}
    <i className="ri-user-add-fill text-2xl cursor-pointer hover:text-indigo-500 transition"></i>
    <i className="ri-group-3-fill text-2xl cursor-pointer hover:text-indigo-500 transition"></i>
    <i className="ri-chat-1-fill text-2xl cursor-pointer hover:text-indigo-500 transition"></i>
  </div>

  {/* Bottom Sign Out */}
  <div className="flex flex-col items-center mb-4 cursor-pointer hover:text-red-500">
    <i className="ri-logout-box-fill text-2xl"></i>
    <span className="text-xs mt-1">Sign Out</span>
  </div>
</div>

      {/* Left Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white flex flex-col shadow-lg border-r-2">
        {/* Header */}
        <div className="p-4 font-bold text-xl border-b border-gray-700">
          Friends
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {["Alice", "Bob", "Charlie", "Group 1"].map((contact, idx) => (
            <div
              key={idx}
              className="p-4 border-b border-gray-700 cursor-pointer hover:bg-indigo-700 flex items-center gap-3 transition"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                {contact[0]}
              </div>
              <span>{contact}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-900 text-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700 font-bold bg-gray-800 shadow-sm">
          Chat with Alice
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
          {/* Incoming Message */}
          <div className="max-w-xs bg-gray-700 p-3 rounded-xl shadow-sm">
            Hi there! How are you doing today?
          </div>

          {/* Outgoing Message */}
          <div className="max-w-xs bg-indigo-600 p-3 rounded-xl shadow-sm self-end text-white">
            I'm good, thanks! What about you?
          </div>

          {/* Incoming Message */}
          <div className="max-w-xs bg-gray-700 p-3 rounded-xl shadow-sm">
            I'm doing great! Ready for our project discussion?
          </div>
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-gray-700 bg-gray-800 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-full border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
            Send
          </button>
        </div>
      </div>
      {showProfile && (
        <ProfileComponents onClose={() => setShowProfile(false)} />
      )}
    </main>




  )
}

export default Home