import React from 'react'
import { useSelector } from 'react-redux'

const ProfileComponents = ({ onClose }) => {
    const getProfile = useSelector(store => store.profile)
    console.log(getProfile)

    const dateStr = getProfile.createdAt
    const date = new Date(dateStr);

    const formatteddate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long"
    });

    return (
        <div className="absolute top-0 left-0 h-1/3 rounded-md w-[20vw] bg-gray-200 shadow-lg flex flex-col p-4 animate-slideIn">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="font-bold text-lg text-gray-900">Profile</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-red-500">
                    <i className="ri-close-line text-2xl"></i>
                </button>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-2">

                <h1 className="text-xl font-semibold">{getProfile?.username}</h1>
                <p className="text-gray-700">{getProfile?.email}</p>
                <p className="text-gray-700">{formatteddate}</p>

            </div>
        </div>
    )
}

export default ProfileComponents
