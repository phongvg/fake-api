import mongoose, { Schema, Document, Model } from 'mongoose'
import { UserVerifyStatus } from '~/constants/enums'

interface User extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  doB: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  avatar: string
}

const date = new Date()

const userSchema = new Schema<User>({
  name: { type: String, required: false, default: '' },
  email: { type: String, required: true, unique: true },
  doB: { type: Date, required: false, default: new Date() },
  password: { type: String, required: true },
  created_at: { type: Date, required: false, default: date },
  updated_at: { type: Date, required: false, default: date },
  email_verify_token: { type: String, required: false, default: '' },
  forgot_password_token: { type: String, required: false, default: '' },
  verify: {
    type: Number,
    enum: UserVerifyStatus,
    required: false,
    default: UserVerifyStatus.Unverified
  },
  avatar: { type: String, required: false, default: '' }
})

const UserModel: Model<User> = mongoose.model<User>('User', userSchema)

export default UserModel
