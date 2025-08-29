import  prisma  from "./prisma.service.js";
import * as authService from "../services/auth.service.js"

export const createUser = async ({username, email, password})=>{
    if(!username || !email || !password){
        throw new console.error(("email and password is required"));
        
    }
    const hashedPassword = await authService.hashPassword(password)
    const user = await prisma.user.create({
        data:{
            username,
            email,
            password:hashedPassword
        }
    })
    return user
}

export const loginUser = async function({email, password}){
    if(!email || !password){
        throw new error("email and password is required")
    }
    
}


export const searchUsers = async (username) => {


    if (!username) {
      return res.status(400).json({ error: "Username query is required" });
    }

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: username,  
          mode: "insensitive",  
        },
      },
      select: {
        id: true,
        username: true,
      },
      take: 10, 
    });

    
  return users;

}

export const addUser = async(userId, friendId)=>{
   const newFriend = await prisma.friend.create({
      data: {
        userId,
        friendId,
      },
    });

    return newFriend;
}

export const fetchUser = async (userId)=>{
  const fetchFriends = await prisma.friend.findMany({
  where: { userId },
  include: { friend: { select: { id: true, username: true } } }
});
return fetchFriends;
}