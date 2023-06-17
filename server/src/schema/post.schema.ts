import {object, string, TypeOf} from 'zod'

export const createPostSchema = object({
  body: object({
    title: string({required_error: 'Title is required'}),
    body: string({required_error: 'Body is required'}),
  }),
})

export type CreatePostSchema = TypeOf<typeof createPostSchema>['body']

export const updatePostSchema = object({
  body: object({
    title: string({required_error: 'Title is required'}).optional(),
    body: string({required_error: 'Body is required'}).optional(),
  }),
})

export type UpdatePostSchema = TypeOf<typeof updatePostSchema>['body']
