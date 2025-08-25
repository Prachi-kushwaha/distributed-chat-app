import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import chatRoomRoutes from "./routes/chatroom.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/user', userRoutes)
app.use('/chatroom', chatRoomRoutes)

app.get('/', (req, res)=>{
    res.send("hello world")
})

app.listen(3000, ()=>{
    console.log(`server is running on port 3000`)
})
