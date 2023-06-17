export const ErrorHandler = (status: number, message?: string) => Promise.reject({
  status,
  message: message ? message : 'Internal Server Error'
})