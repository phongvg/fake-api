import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import UserModel from '~/models/User.model'
import { RegisterReqBody } from '~/models/requests/User.requests'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'test' && password === '1') {
    return res.status(200).json({
      message: 'Login-ed'
    })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    await userService.register(req.body)
    return res.status(201).json({
      message: 'Register success'
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: 'Register Error'
    })
  }
}
