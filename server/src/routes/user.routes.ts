import {Router} from 'express'
import {loginUser, registerUser} from '../controllers/user.controller'
import {validate} from '../middlewares/validator.middleware'
import {loginUserSchema, registerUserSchema} from '../schema/user.schema'

const router = Router()

router.post('/register', validate(registerUserSchema), registerUser)

router.post('/login', validate(loginUserSchema), loginUser)

export default router;