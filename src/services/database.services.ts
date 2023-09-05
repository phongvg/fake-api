import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/'
const DB_NAME = process.env.DB_NAME || 'post-dev'

export default class DatabaseService {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect(DB_URL + DB_NAME)
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
      throw error
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect()
      console.log('Disconnected from MongoDB')
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error)
      throw error
    }
  }
}
