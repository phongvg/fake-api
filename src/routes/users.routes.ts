import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { registerValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const usersRouter = Router()
usersRouter.post('/register', registerValidator, wrapAsync(registerController))
/**
 * path: /register method: POST body: {email, password}
 */
export default usersRouter
