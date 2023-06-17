import bcrypt from 'bcrypt'
import {rounds} from '../config'

export const createHashedPassword = async (plainTextPwd: string): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds)

  return await bcrypt.hash(plainTextPwd, salt)
}

export const verifyPassword = async (plainTextPwd: string, hashedPassword: string) => {
  return await bcrypt.compare(plainTextPwd, hashedPassword)
}