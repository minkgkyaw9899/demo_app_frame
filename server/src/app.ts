import http from 'http'
import express, {ErrorRequestHandler, NextFunction, Request, Response} from 'express'
import {port} from './config'
import {logger} from './utils/logger'
import createHttpError from 'http-errors'
import userRoutes from './routes/user.routes'
import {checkAuth} from './middlewares/checkAuth.middleware'
import postRoutes from './routes/post.routes'

const app = express()

// const key = generateKey()
// const iv = generateIV()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(globalEncryptResponse(key, iv))
// app.use(globalDecryptRequest(key, iv))

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', checkAuth, postRoutes)

app.use((_req: Request, _res: Response, next: NextFunction) => {
  return next(createHttpError(404, 'Your request was not found'))
})

app.use(((err, req, res, _next) => {
  const status = err.status ?? 500
  const message = err.message ?? 'Internal Server Error'

  return res.status(status).json({
    error: {
      status,
      message,
    },
  })
}) as ErrorRequestHandler)

const server = http.createServer(app)

server.listen(port, () => logger('success', 'startup', `Server listening on ${port}`))
