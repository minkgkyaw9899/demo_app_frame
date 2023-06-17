import Config from 'react-native-config'

export const endPoint = Config.API_URL

export const loginEndPoint = `/users/login`

export const registerEndPoint = `${Config.API_URL}/users/register`

export const postEndPoint = `${Config.API_URL}/posts`
