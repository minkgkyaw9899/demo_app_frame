import {ErrorResponse, PostsResponse} from 'src/@types/axios/types'
import {AxiosError, AxiosResponse} from 'axios'
import {ErrorHandler} from 'utils/errorHandler'
import {logger} from 'utils/logger'
import axiosInstance from 'libs/axios/axiosInstance'
import {postEndPoint} from 'constants/baseURL'
import {QueryFunctionContext} from '@tanstack/react-query'

export const fetchAllPosts = async ({pageParam}: QueryFunctionContext) => {
  try {
    const response: AxiosResponse<PostsResponse> = await axiosInstance.get(`${postEndPoint}?pages=${pageParam || 1}`)

    const currentPage = response.data.meta.currentPages
    const totalPages = response.data.meta.totalPages
    const nextPage = response.data.meta.nextPage

    return {
      data: response.data.data.posts,
      pagination: {
        currentPage,
        totalPages,
        nextPage,
      },
    }
  } catch (error: any) {
    const loggerOption = {
      funcName: 'fetchAllPosts',
      lineNO: 6,
      path: 'services/queries/postQueries.ts',
    }

    const err = error as AxiosError<ErrorResponse>

    const message = err.response?.data.error.message ?? err.message
    const status = err.response?.status ?? err.status

    logger('error', message, {status, ...loggerOption})
    return ErrorHandler(status, message)
  }
}
