import * as userService from "../services/user.service.js"
import * as authService from "../services/auth.service.js"
import prisma from "../services/prisma.service.js";
import redisClient from "../services/redis.service.js";
import jwt from "jsonwebtoken"
// Create a user
export const createUser = async (req, res) => {
  try {
    
    const user = await userService.createUser(req.body);
 
    const token = await authService.generateJWT(user)
    res.status(201).json({user, token});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async function(req, res){
  const {email, password} = req.body
  // console.log("helo")
  try {
    const user = await prisma.user.findUnique({where:{email}})
    // console.log(user)
    if(!user){
       return res.status(401).json({ message: "Invalid emaild" });
    }
    const isMatch = await authService.isValidPassword(password, user.password)
    // console.log(isMatch)
    if(!isMatch){
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await authService.generateJWT(user)
    console.log(req.headers.authorization)

    // console.log(token)
    res.status(201).json({user, token})
    // console.log(req.headers.authorization)
  } catch (error) {
    console.error("Login error:", error);
     res.status(400).json({ error: error.message });
  }
} 


export const logoutController = async (req, res) => {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization)
    if (!authHeader || !authHeader.startsWith("bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 2. Decode JWT to get remaining time (optional, or use fixed TTL)
    const decoded = jwt.decode(token); // no verification needed here
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = decoded?.exp ? decoded.exp - now : 3600; // fallback 1hr

    // 3. Add token to Redis blacklist
    await redisClient.set(`blacklist:${token}`, "true", "EX", expiresIn);

    // 4. Respond
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getProfile = async (req, res) => {
  console.log(req.user)
  try {
    console.log(req.user.id)
    const user = await prisma.user.findUnique({
      
      where: { id: req.user.id },
      select: {
        email: true,
        username: true, 
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { username } = req.query; // better for GET search
    
    if (!username) {
      return res.status(400).json({ message: "Username query is required" });
    }

    const findUser = await userService.searchUsers(username);

    if (!findUser || findUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ users: findUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const addUserController = async(req, res)=>{
  console.log(req.user)
  console.log("hello")
  console.log(req.body)
  const userId = req.user.id;
  const {friendId} = req.body;

  try {
     const existing = await prisma.friend.findUnique({
      where: {
        userId_friendId: { userId, friendId },
      },
    });

    if (existing) {
      return res.status(400).json({ message: "Already friends" });
    }
   const addnewfriend = await userService.addUser(userId, friendId)
   
   if(!addnewfriend){
    res.status(401).json({message:"add new freinds"})
   }

   const friendData = await prisma.user.findUnique({
      where: { id: friendId },
      select: { id: true, username: true }, // only send public info
    });

    res.status(201).json({ addnewfriend: friendData });
  } catch (error) {
    console.log(error)
    res.status(401).json({error:error.message})
  }

   
}

export const fetchUserController = async(req, res)=>{
  const userId = req.user.id;
  
  try {
    const fetchFriends = await userService.fetchUser(userId)
    if(!fetchFriends){
      res.status(400).json({message:"invalid credentials fetchfriends"})
    }
  const friendList = fetchFriends.map(f => f.friend);
  res.status(200).json(friendList);
  } catch (error) {
    console.log(error)
    res.status(401).json({error:error.message})
  }
  
}