import {Post, User} from '@prisma/client'
import {dbClientError, PostModal} from '../utils/db'
import {ErrorHandler} from '../utils/errorHandler'
import {logger} from '../utils/logger'

type CreatePostProps = {
  title: string
  body: string
  userId: User['id']
}

type UpdatePostProps = {
  postId: string
  title?: string
  body?: string
}

type PaginateProps = {
  take: number
  skip: number
}

export const getTotalPostsQuantity = async (): Promise<number> => {
  try {
    return await PostModal.count()
  } catch (err: any) {
    return ErrorHandler(500, err?.message)
  }
}
export const getAllPosts = async ({skip, take}: PaginateProps): Promise<Post[]> => {
  try {
    return await PostModal.findMany({
      skip,
      take,
      include: {
        postBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  } catch (err: any) {
    return ErrorHandler(500, err?.message)
  }
}

export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    return await PostModal.findUnique({
      where: {id: postId},
      include: {
        postBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  } catch (err: any) {
    return ErrorHandler(500, err?.message)
  }
}

export const createPost = async (data: CreatePostProps): Promise<Post> => {
  try {
    return await PostModal.create({data})
  } catch (err: any) {
    logger('error', 'createPost', err.message)
    return ErrorHandler(500, err.message)
  }
}

export const updatePost = async (data: UpdatePostProps): Promise<Post> => {
  const {postId, title, body} = data
  try {
    return await PostModal.update({where: {id: postId}, data: {title, body}})
  } catch (err: any) {
    return ErrorHandler(500, err?.message)
  }
}

export const deletePost = async (postId: string): Promise<Post> => {
  try {
    return await PostModal.delete({where: {id: postId}})
  } catch (err: any) {
    if (err instanceof dbClientError) {
      if (err.code === 'P2025') {
        return ErrorHandler(404, 'Post not found')
      }
    }
    return ErrorHandler(500, 'Db error')
  }
}
