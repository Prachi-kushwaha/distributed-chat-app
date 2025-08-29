import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import ProfileComponents from '../components/profileCmponents'
import { useDispatch, useSelector } from 'react-redux'
import AddUserComponent from '../components/addUserComponent'
import { addContact } from '../utils/addFriends'
import axios from '../config/axios.js'
import { initializeSocket } from '../config/socket.js'



const Home = () => {
  const [showProfile, setShowProfile] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const dispatch = useDispatch()
  const userData = useSelector(store => store.login)
  const friendsData = useSelector(store => store.addfriend)
  console.log(friendsData)

  useEffect(() => {
    initializeSocket()
    const token = localStorage.getItem("token");
    if (!token) return;


    axios
      .get("/user/fetchuser", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data); // this is your friend list [{id, username}, ...]
        res.data.forEach(friend => {
          dispatch(addContact(friend)); // add each friend to Redux store
        });
      })
      .catch((err) => console.log(err.response?.data || err.message));
  }, [dispatch]);


  return (

    <main className="flex h-screen bg-gray-900">
      <div className="w-[5vw] bg-gray-900 flex flex-col justify-between text-white h-screen p-2">

        <div className="flex flex-col items-center gap-6 mt-4">

          <div onClick={() => setShowProfile(true)} className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {userData?.user?.username?.[0]}
          </div>


          <i onClick={() => setShowAddUser(true)} className="ri-user-add-fill text-2xl cursor-pointer hover:text-indigo-500 transition"></i>
          <i className="ri-group-3-fill text-2xl cursor-pointer hover:text-indigo-500 transition"></i>
          <i className="ri-chat-1-fill text-2xl cursor-pointer hover:text-indigo-500 transition"></i>
        </div>


        <div className="flex flex-col items-center mb-4 cursor-pointer hover:text-red-500">
          <i className="ri-logout-box-fill text-2xl"></i>
          <span className="text-xs mt-1">Sign Out</span>
        </div>
      </div>


      <div className="w-1/5 bg-gray-800 text-white flex flex-col shadow-lg border-r-2">

        <div className="p-4 font-bold text-xl border-b border-gray-700">
          Friends
        </div>


        <div className="flex-1 overflow-y-auto">
          {friendsData.contacts.length > 0 ? (
            friendsData.contacts.map((contact) => (
              <div
                key={contact._id}
                className="p-4 border-b border-gray-700 cursor-pointer hover:bg-indigo-700 flex items-center gap-3 transition"
              >
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {contact.username[0]}
                </div>
                <span>{contact.username}</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-400">No friends added yet</div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-gray-900 text-white">

        <div className="p-4 border-b border-gray-700 font-bold bg-gray-800 shadow-sm">
          Chat with Alice
        </div>


        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">

          <div className="max-w-xs bg-gray-700 p-3 rounded-xl shadow-sm">
            Hi there! How are you doing today?
          </div>


          <div className="max-w-xs bg-indigo-600 p-3 rounded-xl shadow-sm self-end text-white">
            I'm good, thanks! What about you?
          </div>


          <div className="max-w-xs bg-gray-700 p-3 rounded-xl shadow-sm">
            I'm doing great! Ready for our project discussion?
          </div>
        </div>


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
      {showAddUser && (
        <AddUserComponent onClose={() => setShowAddUser(false)} />
      )}
    </main>




  )
}

export default Home