import {NextFunction, Request, Response} from 'express'
import createHttpError from 'http-errors'
import {createUser, findUserByEmail} from '../services/user.service'
import {RegisterUserSchema} from '../schema/user.schema'
import {excludeFields} from '../utils/db'
import {verifyPassword} from '../libs/bcrypt.utils'
import {createToken} from '../libs/jwt.utils'

export const registerUser = async (
  req: Request<unknown, unknown, RegisterUserSchema>,
  res: Response,
  next: NextFunction
) => {
  const input = req.body
  try {
    const user = excludeFields(await createUser(input), ['password'])

    const token = createToken({id: user.id, email: user.email})

    return res.status(201).json({
      meta: {
        status: 201,
        message: 'Successfully register user',
      },
      data: {
        user,
        token,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password} = req.body
    const user = await findUserByEmail(email)

    if (!user) return next(createHttpError(404, 'User not found'))

    const isMatchPwd = await verifyPassword(password, user.password)

    if (!isMatchPwd) return next(createHttpError(401, 'Invalid email or password'))

    const token = createToken({id: user.id, email: user.email})

    return res.status(200).json({
      meta: {
        status: 200,
        message: 'Successfully login',
      },
      data: {
        user: excludeFields(user, ['password']),
        token,
      },
    })
  } catch (err) {
    return next(err)
  }
}
