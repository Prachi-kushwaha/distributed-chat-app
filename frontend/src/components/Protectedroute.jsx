import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const Protectedroute = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    if(!token){
       return navigate('/login')
    }
    return <Outlet />;
  
}

export default Protectedroute