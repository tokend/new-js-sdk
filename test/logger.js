import loglevel from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import chalk from 'chalk'

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red
}

prefix.reg(loglevel)
loglevel.enableAll()

prefix.apply(loglevel, {
  format (level, name, timestamp) {
    return `${chalk.gray(`[${timestamp}]`)}${colors[ level.toUpperCase() ](level)} ${chalk.green(`${name}:`)}`
  }
})

prefix.apply(loglevel.getLogger('critical'), {
  format (level, name, timestamp) {
    return chalk.red.bold(`[${timestamp}] ${level} ${name}:`)
  }
})

export const logger = {
  ...loglevel,
  new: loglevel.getLogger
}
