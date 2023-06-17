import CryptoJS from 'crypto-js'
import {NextFunction, Request, Response} from 'express'
import {decryptData} from '../libs/crypto.utils'
import createHttpError from 'http-errors'

export const globalDecryptRequest =
  (key: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray) => (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') return next()

    const encryptedText = req.body.data

    if (!encryptedText) return next(createHttpError(422, 'Body not found'))

    req.body = decryptData(encryptedText, key, iv)

    return next()
  }
