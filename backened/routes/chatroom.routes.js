import Router from "express"
import { validate } from "../middleware/validate.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import * as chatRoomController from "../controller/chatroom.controller.js"

const router = Router()

router.post('/create',validate,chatRoomController.createChatRoomController )

export default router