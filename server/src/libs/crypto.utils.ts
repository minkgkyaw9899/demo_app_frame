import CryptoJS from 'crypto-js'

import {encryptCost as cost, encryptLength as length, encryptPassword as password, encryptSalt as salt} from '../config'

export const generateKey = () => {
  return CryptoJS.PBKDF2(password, salt, {keySize: length / 32, iterations: cost})
}

export const generateIV = () => CryptoJS.lib.WordArray.random(16)

export const encryptData = (text: string, key: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray) => {
  return CryptoJS.AES.encrypt(text, key, {iv}).toString()
}

export const decryptData = (cipher: string, key: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray): any => {
  const decryptedBytes = CryptoJS.AES.decrypt(cipher, key, {iv})
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedText)
}
