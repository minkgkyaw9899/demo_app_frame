import axiosInstance from 'libs/axios/axiosInstance'
import {loginEndPoint, registerEndPoint} from 'constants/baseURL'
import {AxiosError, AxiosResponse} from 'axios'
import {ErrorHandler} from 'utils/errorHandler'
import {logger} from 'utils/logger'
import {AuthUserResponse} from 'src/@types/axios/types'

type LoginDataProps = {
  email: string
  password: string
}

type RegisterDataProps = {
  name: string
  email: string
  password: string
}

export const loginWithEmail = async (input: LoginDataProps) => {
  try {
    const response: AxiosResponse<AuthUserResponse> = await axiosInstance.post(loginEndPoint, input)
    return response.data.data
  } catch (err: any) {
    const loggerOption = {
      funcName: 'loginWithEmail',
      lineNO: 13,
      path: 'services/mutations/authMutations.ts',
    }

    if (err instanceof AxiosError) {
      const status = err.response?.status

      logger('error', err.message, {status, ...loggerOption})
      if (status === 400) throw await ErrorHandler(404, 'Invalid email or password')
      else if (status === 401) throw await ErrorHandler(401, 'Invalid email or password')
      else {
        const message = err.response ? err.response?.data.error.message : err.message
        logger('error', message, {status, ...loggerOption})
        throw await ErrorHandler(status, message)
      }
    }

    logger('error', err?.message, loggerOption)
    throw await ErrorHandler(500, 'Something went wrong')
  }
}

export const registerWithEmail = async (input: RegisterDataProps) => {
  try {
    const response: AxiosResponse<AuthUserResponse> = await axiosInstance.post(registerEndPoint, input)
    return response.data.data
  } catch (err: any) {
    const loggerOption = {
      funcName: 'registerWithEmail',
      lineNO: 47,
      path: 'services/mutations/authMutations.ts',
    }

    if (err instanceof AxiosError) {
      const status = err.response?.status
      logger('error', err.message, {status, ...loggerOption})
      if (status === 400) throw await ErrorHandler(409, 'User already existed')
      else {
        const message = err.response?.data.error.message
        logger('error', message, {status, ...loggerOption})
        throw await ErrorHandler(status, message)
      }
    }

    logger('error', err?.message, loggerOption)
    throw await ErrorHandler(500, 'Something went wrong')
  }
}
