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