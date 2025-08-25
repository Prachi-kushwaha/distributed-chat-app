import redisClient from "../services/redis.service.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookie or header
    const authHeader = req.cookies.token || req.headers.authorization;
    console.log(req.cookies.token)
    console.log("hello")
    console.log(req.headers.authorization)
    if (!authHeader || !authHeader.startsWith("bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // 1. Check if token is blacklisted
    const isBlacklisted = await redisClient.exists(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token revoked. Please login again." });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    req.user = decoded; // attach user info to request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
