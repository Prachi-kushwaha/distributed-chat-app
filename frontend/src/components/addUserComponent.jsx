import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestions, addContact } from "../utils/addFriends.js";
import axios from "../config/axios.js";

const AddUserComponent = ({onClose}) => {
  const [search, setSearch] = useState("");
  const { suggestions } = useSelector((state) => state.addfriend); // ✅ fixed
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)

    if (e.target.value.length > 1) {
      console.log("hello")
      const res = await axios.get(`/user/search?username=${e.target.value}`);
      console.log(res.data)
      // const data = await res.json();/''
      // console.log(data)

      dispatch(setSuggestions(res?.data.users)); // ✅ save to redux
    } else {
      dispatch(setSuggestions([]));
    }
  };

  const handleAdd = async (user) => {
    console.log("hello")
    console.log(user._id)
    const token = localStorage.getItem("token");
    console.log(token) // or wherever you stored your JWT

    await axios.post(
      "/user/adduser",
      { friendId: user._id },
      {
        headers: {
          Authorization: `bearer ${token}`, // Attach token here
        },
      }
    ).then((res) => {
      console.log(res.data);
      dispatch(addContact(res.data.addnewfriend));
    }).catch((error) => {
      console.log(error.response?.data || error.message);
    })
  }

  return (
    <div className="p-4 text-white">
       <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="font-bold text-lg text-gray-200">Search</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-red-500">
                    <i className="ri-close-line text-2xl"></i>
                </button>
            </div>
      <input
        type="search"
        value={search}
        onChange={handleSearch}
        placeholder="Search users..."
        className="border p-2 w-full rounded"
      />

      <ul className="mt-2 border rounded max-h-40 overflow-y-auto">
        {suggestions.slice(0, 5).map((user) => (
          <li key={user._id} className="flex justify-between items-center p-2 border-b">
            <span>{user.username}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => handleAdd(user)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddUserComponent;
