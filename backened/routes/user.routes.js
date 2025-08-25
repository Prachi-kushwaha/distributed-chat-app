import Router from "express"
import * as userController from "../controller/user.controller.js"
import * as userValidator from "../validation/user.validation.js";
import { validate } from "../middleware/validate.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/create',userValidator.createUserValidator, validate, userController.createUser )
router.post('/login',userValidator.loginValidator, validate, userController.loginController )
router.get('/logout', userController.logoutController)
router.get('/profile', authMiddleware, userController.getProfile)

export default router