export const ErrorHandler = (status?: number, message?: string) =>
  Promise.reject({
    status: status ? status : 500,
    message: message ? message : 'Internal Server Error',
  })
