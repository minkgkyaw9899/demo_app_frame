import { PostCreateResponse } from 'src/@types/axios/types'
import { AxiosError, AxiosResponse } from 'axios'
import { postEndPoint } from 'constants/baseURL'
import axiosInstance from 'libs/axios/axiosInstance'
import { PostCreateObj } from 'src/@types/posts/types'
import { logger } from 'utils/logger'
import { ErrorHandler } from 'utils/errorHandler'

export const createPost = async (newPost: PostCreateObj) => {
    try {
        const response: AxiosResponse<PostCreateResponse> = await axiosInstance.post(postEndPoint, newPost)
        return response.data.data
    } catch (error: any) {
        const loggerConfig = {
            funcName: 'createPost',
            lineNO: 7,
            path: 'services/mutations/postMutations.ts'
        }

        if (error instanceof AxiosError) {
            const status = error?.response?.status
            const message = error?.response ? error?.response?.data.error.message : error.message

            logger('error', message, { status, ...loggerConfig })
            throw await ErrorHandler(status, message)
        }
        logger("error", error.message, loggerConfig)
        throw ErrorHandler(500, "Something went wrong!")
    }
}