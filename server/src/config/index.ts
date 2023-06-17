import dotenv from 'dotenv'

dotenv.config()
export const port = process.env.PORT || 3000

export const rounds = process.env.ROUNDS ? +process.env.ROUNDS : 10

export const encryptPassword = process.env.ENCRYPT_PASSWORD ?? 'ace_encrypt_password'

export const encryptSalt = process.env.ENCRYPT_SALT ?? 'salt'

export const encryptCost = process.env.ENCRYPT_COST ? +process.env.ENCRYPT_COST : 5

export const encryptLength = process.env.ENCRYPT_LEGNTH ? +process.env.ENCRYPT_LEGNTH : 256

export const jwtSecret = process.env.JWT_SECRET ?? 'jwt secure secret 123'
