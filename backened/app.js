import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import chatRoomRoutes from "./routes/chatroom.routes.js"
import { Server } from "socket.io"
import http from "http"
import jwt from "jsonwebtoken"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend port
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/user", userRoutes)
app.use("/chatroom", chatRoomRoutes)

// app.get("/", (req, res) => {
//   res.send("hello world")
// })

io.use((socket, next)=>{
try {
  const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1]
  if(!token){
    return next(new Error('Authentication error websocket token'))
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  if(!decoded){
    return next(new Error('authentication error in websocket decoded'))
  }
  socket.user = decoded
  next();
} catch (error) {
  next(error)
}
})

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id)
  socket.on('event', data=>{})
  socket.on('disconnect', ()=>{})
})

server.listen(3000, () => {
  console.log(`server is running on port 3000`)
})
