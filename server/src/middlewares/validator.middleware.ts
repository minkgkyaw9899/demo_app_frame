import {AnyZodObject, ZodError, ZodIssue} from 'zod'
import {type NextFunction, type Request, type Response} from 'express'
import createHttpError from 'http-errors'
import {logger} from '../utils/logger'

export const validate = (schema: AnyZodObject) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    return next()
  } catch (err: any) {
    if (err instanceof ZodError) {
      const message = err.issues.map((error: ZodIssue) => error.message)[0]
      return next(createHttpError(422, message))
    }
    logger('error', 'validator middleware', err?.message)
    return next(createHttpError(422))
  }
}
