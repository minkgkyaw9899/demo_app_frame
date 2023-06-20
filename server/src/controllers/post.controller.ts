import {NextFunction, Request, Response} from 'express'
import {CreatePostSchema, UpdatePostSchema} from '../schema/post.schema'
import {
  createPost,
  deletePost,
  findPostByUserId,
  getAllPosts,
  getPostById,
  getTotalPostsQuantity,
  updatePost,
} from '../services/post.service'
import createHttpError from 'http-errors'

export const createPostController = async (
  req: Request<unknown, unknown, CreatePostSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = req.body
    const userId = res.locals.user?.id
    const data = {...input, userId}
    const post = await createPost(data)

    return res.status(200).json({
      meta: {
        status: 200,
        message: 'Successfully create new post',
      },
      data: {
        post,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const getAllPostsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let pages = req.query.pages ? parseInt(<string>req.query.pages) : 1
    if (isNaN(pages)) return next(createHttpError(422, 'Pages should be number type'))

    let skip: number,
      take: number = 15

    pages <= 1 ? (skip = 0) : (skip = (pages - 1) * take)

    const posts = await getAllPosts({skip, take})

    pages = pages++

    const total = await getTotalPostsQuantity()

    const totalPages = Math.ceil(total / take)

    const hasNextPage = pages < totalPages

    const nextPage = hasNextPage ? pages + 1 : null

    return res.status(200).json({
      meta: {
        status: 200,
        message: 'Successfully create new post',
        total,
        totalPages,
        currentPages: pages,
        hasNextPage,
        nextPage,
      },
      data: {
        posts,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const getAllPostsByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // let pages = req.query.pages ? parseInt(<string>req.query.pages) : 1
    // if (isNaN(pages)) return next(createHttpError(422, 'Pages should be number type'))
    //
    // let skip: number,
    //   take: number = 15
    //
    // pages <= 1 ? (skip = 0) : (skip = (pages - 1) * take)

    const userId = req.params?.userId

    if (!userId) return next(createHttpError(422, 'User id is required'))

    const posts = await findPostByUserId(userId)

    return res.status(200).json({
      meta: {
        status: 200,
        message: 'Successfully get posts',
      },
      data: {
        posts,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const getPostByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id

    if (!postId) return next(createHttpError(422, 'Post id not found'))

    const post = await getPostById(postId)

    if (!post) return next(createHttpError(404, 'Post not found'))

    return res.status(200).json({
      meta: {
        status: 200,
        message: `Successfully get post`,
      },
      data: {
        post,
      },
    })
  } catch (err: any) {
    return next(err)
  }
}

export const updatePostController = async (
  req: Request<{id: string}, unknown, UpdatePostSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const userId = res.locals.user?.id
    const input = {postId: id, userId, ...req.body}

    const post = await updatePost(input)

    return res.status(202).json({
      meta: {
        status: 202,
        message: 'Successfully create new post',
      },
      data: {
        post,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const deletePostController = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id
    const post = await deletePost(postId)

    return res.status(200).json({
      meta: {
        status: 200,
        message: 'Successfully deleted post',
      },
      data: {
        post: {
          id: postId,
        },
      },
    })
  } catch (err) {
    return next(err)
  }
}
