import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const hashPassword = async function(password){
    return bcrypt.hash(password, 10);
}

export const generateJWT = async function (user) {
    return jwt.sign({id:user.id, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    )
} 

export const isValidPassword = async function(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword)
}