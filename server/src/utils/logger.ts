import consola from 'consola'
import {Chalk} from 'chalk'

const chalk = new Chalk({level: 3})
export const logger = (type: 'success' | 'error' | 'warn' | 'info' , funcName: string, message: string) => {
  switch (type) {
    case 'success': {
      return consola.success(` ${chalk.bgGreen.black.bold(funcName)} ${chalk.green(message)}`)
    }
    case 'error': {
      return consola.error(` ${chalk.bgRed.whiteBright.bold(funcName)} ${chalk.redBright(message)}`)
    }
    case 'warn': {
      return consola.warn(` ${chalk.bgYellow.whiteBright.bold(funcName)} ${chalk.yellowBright(message)}`)
    }
    case 'info': {
      return consola.info(` ${chalk.bgBlue.whiteBright.bold(funcName)} ${chalk.blueBright(message)}`)
    }
  }
}