import {Router} from 'express'
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
} from '../controllers/post.controller'
import {validate} from '../middlewares/validator.middleware'
import {createPostSchema, updatePostSchema} from '../schema/post.schema'

const router = Router()

router.get('/', getAllPostsController)

router.get('/user/:id')

router.post('/', validate(createPostSchema), createPostController)

router.get('/:id', getPostByIdController)

router.patch('/:id', validate(updatePostSchema), updatePostController)

router.delete('/:id', deletePostController)

export default router
