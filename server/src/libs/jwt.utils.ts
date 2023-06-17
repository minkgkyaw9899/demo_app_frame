import jwt from 'jsonwebtoken'
import {jwtSecret} from '../config'
import {logger} from '../utils/logger'

export type Payload = {
  id: string
  email: string
}
export const createToken = (payload: Payload) => {
  return jwt.sign(payload, jwtSecret)
}

export const verifyToken = (token: string) => {
  try {
    const decoded: Payload = jwt.verify(token, jwtSecret) as Payload
    return {
      decoded,
      expired: false,
      valid: true,
    }
  } catch (err: any) {
    logger('error', 'verify token', err?.message)
    return {
      valid: false,
      decoded: null,
      expired: err.message === 'jwt expired',
    }
  }
}
