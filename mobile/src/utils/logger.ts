import consola from 'consola'
import chalk from 'chalk'

const ctx = new chalk.Instance({level: 3})

type Options =
  | {
      funcName?: string // function name
      status?: number // optional response status (useful with api)
      lineNO?: number // optional function line number
      path?: string // optional file path
    }
  | undefined

export const logger = (
  type: 'success' | 'error' | 'warn' | 'info', // log type (required)
  message: string, // custom message (required)
  options: Options = {},
) => {
  const funcName = options?.funcName ? `status:${options.funcName}` : 'funcName:unknown'
  const status = options?.status ? `status:${options.status}` : 'status:unknown'
  const lineNo = options?.lineNO ? `lineNo:${options.lineNO}` : 'lineNo:unknown'
  const path = options?.path ? `path:${options.path}` : 'path:unknown'

  switch (type) {
    case 'success': {
      return consola.success(
        `${ctx.bgGreen.whiteBright(type)} \nmessage:${message} \n${status} \n${lineNo} \n${funcName} \n${path}`,
      )
    }
    case 'error': {
      return consola.error(
        `${chalk.bgRed.whiteBright(type)} \nmessage:${message} \n${status} \n${lineNo} \n${funcName} \n${path}`,
      )
    }
    case 'warn': {
      return consola.warn(
        `${chalk.bgYellow.whiteBright(type)} \nmessage:${message} \n${status} \n${lineNo} \n${funcName} \n${path}`,
      )
    }
    case 'info': {
      return consola.info(
        `${chalk.bgBlue.whiteBright(type)} \nmessage:${message} \n${status} \n${lineNo} \n${funcName} \n${path}`,
      )
    }
  }
}
