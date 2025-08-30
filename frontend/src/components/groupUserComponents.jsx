import React, { Children } from 'react'
import { useEffect } from 'react';
import axios from "../config/axios.js"
import { useDispatch, useSelector } from 'react-redux';
import { showListOfUsers } from '../utils/addUserGroup.js';

const GroupUserComponents = ({ onClose }) => {
    console.log("group")
    const dispatch = useDispatch()
   const groupuserdata = useSelector(store => store.group) || [];
    console.log(groupuserdata)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get('/user/fetchuser', {
                headers: { Authorization: `bearer ${token}` }, 
            })
            .then((res) => {
                console.log("group1")
                console.log(res.data)
                dispatch(showListOfUsers(res.data))
            })
            .catch((error) => {
                console.log(`problem in group section ${error}`)
            })
    }, [dispatch])

    return (
        <div className='items-center bg-gray-900'>
            <div className='flex flex-col items-center'>
                <div className='flex justify-between border-2 border-gray-400 px-4 py-2 '>

                    <h2 className='text-white'>make your group</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-red-500">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                <div className='text-white '>
                    <input className='my-2 border-2 border-gray-200' type="search" name="" id="" />
                    {groupuserdata.map((u) => (
                        <div key={u.id} className='flex justify-between border-2 border-gray-400 mb-4 p-2'>
                            <p>{u.username}</p>
                            <input type="checkbox" name="" id="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GroupUserComponents