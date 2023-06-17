import {PrismaClient, Prisma} from '@prisma/client'

export const prisma = new PrismaClient()

export const UserModal = prisma.user;

export const PostModal = prisma.post

export const connectToDb = prisma.$connect()

export const disconnectFromDb = prisma.$disconnect()

export const dbClientError = Prisma.PrismaClientKnownRequestError

export const excludeFields = <T, Key extends keyof T> (
  fieldObj: T,
  keys: Key[]
): Omit<T, Key> => {
  for (let key of keys) {
    delete fieldObj[key]
  }
  return fieldObj
}
