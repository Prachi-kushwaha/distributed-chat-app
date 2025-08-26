import axios from "../config/axios.js"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { addSignupUser } from "../utils/signupSlice.js"

const Signup = ()=>{
    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const naviagte = useNavigate()

    function submitahandler(e){
        e.preventDefault()
       axios.post('/user/create', {username, email, password}).then((res)=>{
        console.log(res.data)

        localStorage.setItem('token', res.data.token)
        dispatch(addSignupUser(res.data))
        // setUser(res.data)/
        naviagte('/')
       })
    }

    return (
        <div className="h-[100vh] bg-slate-100 overflow-hidden">
            <form className="h-fit w-[30vw] p-10 bg-indigo-100 mx-auto mt-20" onSubmit={submitahandler}>
                <h1 className="text-2xl text-center pb-4">Signup</h1>
                <div className="py-2">
                    <label className="block text-gray-700" htmlFor="">Username</label>
                    <input onChange={(e)=>setUsername(e.target.value)} className="bg-white p-2 mb-2 rounded-md border " type="text" placeholder="write your username"/>
                </div>
                <div className="py-2">
                    <label className="block text-gray-700" htmlFor="">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} className="bg-white p-2 mb-2 rounded-md border " type="text" placeholder="write your email"/>
                </div>
                <div className="py-2">
                    <label className="block text-gray-700" htmlFor="">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} className="bg-white p-2 mb-2 rounded-md border " type="passwprd" placeholder="write your password"/>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md mb-2" type="submit">Signup</button>
                <p>already signup <span><Link to="/login" className="text-indigo-600 hover:text-indigo-800">click here</Link></span></p>
            </form>
        </div>
    )
}

export default Signup