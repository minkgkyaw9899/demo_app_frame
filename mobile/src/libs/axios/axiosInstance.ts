import {endPoint} from 'constants/baseURL'
import axios from 'axios'
import store from 'src/store'

const axiosInstance = axios.create({
  baseURL: endPoint,
  timeout: 5000,
})

axiosInstance.interceptors.request.use(config => {
  const {
    authUser: {token},
  } = store.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
