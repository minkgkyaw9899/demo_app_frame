import {string, z, infer, object, TypeOf} from 'zod'

export const registerUserSchema = object({
  body: object({
    name: string({required_error: 'Name is required'}),
    email: string({required_error: 'Email is required'}).email('Invalid email format'),
    password: string({required_error: 'Password is required'})
  })
})

export const loginUserSchema = object({
  body: object({
    email: string({required_error: 'Email is required'}).email('Invalid email format'),
    password: string({required_error: 'Password is required'})
  })
})

// 2 type of type declaration, and we can be use any format

export type RegisterUserSchema = z.infer<typeof registerUserSchema>['body']

export type LoginUserSchema = TypeOf<typeof loginUserSchema>['body']