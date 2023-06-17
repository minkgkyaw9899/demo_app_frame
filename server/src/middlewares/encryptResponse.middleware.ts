import {NextFunction, Request, Response} from 'express'
import {encryptData} from '../libs/crypto.utils'
import CryptoJS from 'crypto-js'

export const globalEncryptResponse =
  (key: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray) => (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.json
    res.json = function (data: any): Response {
      const text = JSON.stringify(data.data)
      if (!res.locals.encryptedData) {
        res.locals.encryptedData = encryptData(text, key, iv)
      }
      const combinedData = {...data, data: res.locals.encryptedData}
      return originalSend.call(this, combinedData)
    }

    next()
  }
