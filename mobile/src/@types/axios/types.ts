import {PostObj} from 'src/@types/posts/types'
import {UserObj} from 'src/@types/users/types'

export type ErrorResponse = {
  error: {
    status: number
    message: string
  }
}

export type PostsResponse = {
  meta: {
    status: number
    message: string
    total: number
    totalPages: number
    currentPages: number
    hasNextPage: boolean
    nextPage: number | null
  }
  data: {
    posts: PostObj[]
  }
}

export type PostResponse = {
  meta: {
    status: number
    message: string
  }
  data: {
    posts: PostObj
  }
}

export type AuthUserResponse = {
  meta: {
    status: number
    message: string
  }
  data: {
    user: UserObj
    token: string
  }
}
