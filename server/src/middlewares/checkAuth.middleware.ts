import {NextFunction, Request, Response} from 'express'
import createHttpError from 'http-errors'
import {Payload, verifyToken} from '../libs/jwt.utils'
import {findUserById} from '../services/user.service'

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']

    if (!authHeader) return next(createHttpError(401))

    const [type, token] = authHeader.split(' ')

    if (type !== 'Bearer') return next(createHttpError(401, 'Invalid token type'))

    const {decoded, valid, expired} = verifyToken(token)

    if (expired) return next(createHttpError(401, 'Token expired'))

    if (!valid) return next(createHttpError(401, 'Invalid token'))

    const {id} = decoded as Payload

    const user = await findUserById(id)

    if (!user) return next(createHttpError(401, 'User not found'))

    res.locals.user = {
      id: user.id,
    }

    return next()
  } catch (err) {
    return next(err)
  }
}
