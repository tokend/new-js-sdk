import { NotFoundError } from '../../src/errors'
import { logger } from '../logger'
import config from '../config'

export class Running {
  static async delay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static async untilFound (asyncFn, delayMs = config.retry_delay_ms) {
    const log = logger.new('Running.untilFound')
    try {
      const response = await asyncFn()
      if (!response) {
        log.warn('asyncFn returned empty response.')
      }
      return response
    } catch (e) {
      if (e instanceof NotFoundError) {
        log.debug(`Got not found error on ${e.requestPath}, retrying in ${delayMs}ms...`)
        await this.delay(delayMs)
        return this.untilFound(asyncFn)
      }
      log.error(`The error got from ${e.requestPath} is not NotFoundError`)
      throw e
    }
  }

  static async untilReturnValueDefined (asyncFn, delayMs = config.retry_delay_ms) {
    const response = await asyncFn()
    if (!response) {
      await this.delay(delayMs)
      return this.untilReturnValueDefined(asyncFn)
    }
    return response
  }
}
