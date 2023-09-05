import { RegisterReqBody } from '~/models/requests/User.requests'
import databaseService from './database.services'
import UserModel from '~/models/User.model'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'

class UserService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  async register(payload: RegisterReqBody) {
    const { email, password } = payload
    await databaseService.connect()
    const newUser = new UserModel({
      ...payload,
      doB: new Date(payload.doB),
      password: hashPassword(payload.password)
    })
    const result = await newUser.save()
    const user_id = result._id.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    await databaseService.disconnect()
    console.log(access_token)
    return {
      access_token,
      refresh_token
    }
  }
  async checkEmailExist(email: string) {
    await databaseService.connect()
    const user = await UserModel.findOne({ email })
    return Boolean(user)
    await databaseService.disconnect()
  }
}

const userService = new UserService()
export default userService
