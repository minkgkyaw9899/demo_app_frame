import {User} from '@prisma/client'
import {createHashedPassword} from '../libs/bcrypt.utils'
import {dbClientError, UserModal} from '../utils/db'
import {ErrorHandler} from '../utils/errorHandler'
import {logger} from '../utils/logger'

interface CreateUserDefaultProps {
  name: string
  email: string
  password: string
}
export const findUserById = async (userId: string): Promise<User | null> => {
  try {
    return await UserModal.findUnique({where: {id: userId}})
  } catch (err: any) {
    return ErrorHandler(500, err?.message)
  }
}
export const createUser = async (input: CreateUserDefaultProps): Promise<User> => {
  try {
    const {password, name, email} = input

    const hashedPassword = await createHashedPassword(password)

    const userData = {name, email, password: hashedPassword}

    return await UserModal.create({data: userData})
  } catch (err) {
    if (err instanceof dbClientError) {
      if (err.code === 'P2002') {
        return ErrorHandler(409, 'User already existed with that email')
      }
    }
    return ErrorHandler(500)
  }
}

export const findUserByEmail = async (email: string) => {
  try {
    return await UserModal.findUnique({where: {email}})
  } catch (err: any) {
    logger('error', 'findUserByEmail', err?.message)
    if (err) return ErrorHandler(500, 'Db error')
  }
}
