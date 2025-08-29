import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "../config/axios.js"
import { useDispatch } from "react-redux"
import { addLogin } from "../utils/loginSlice.js"

const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    function loginSubmitHandler(e){
        e.preventDefault(),
        axios.post('/user/login', {email, password}).then((res)=>{
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            dispatch(addLogin(res.data))
            navigate('/')
        })
    }

    return (
        <div className="h-[100vh] bg-slate-100 overflow-hidden">
            <form onSubmit={loginSubmitHandler} className="h-fit w-[30vw] p-10 bg-indigo-100 mx-auto mt-20" action="">
                <h1 className="text-2xl text-center pb-4">Login</h1>
                
                <div className="py-2">
                    <label className="block text-gray-700" htmlFor="">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} className="bg-white p-2 mb-2 rounded-md border " type="text" placeholder="write your email"/>
                </div>
                <div className="py-2">
                    <label className="block text-gray-700" htmlFor="">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} className="bg-white p-2 mb-2 rounded-md border " type="passwprd" placeholder="write your password"/>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md mb-2" type="submit">Signup</button>
                <p>already signup <span><Link to="/signup" className="text-indigo-600 hover:text-indigo-800">click here</Link></span></p>
            </form>
        </div>
    )
}

export default Login