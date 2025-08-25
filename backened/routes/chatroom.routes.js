import Router from "express"
import { validate } from "../middleware/validate.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import * as chatRoomController from "../controller/chatroom.controller.js"

const router = Router()

router.post('/create',validate,chatRoomController.createChatRoomController )
router.patch('/addUser',validate,chatRoomController.addUsersController )
router.delete('/removeUser',validate,chatRoomController.removeUsersController )


export default router