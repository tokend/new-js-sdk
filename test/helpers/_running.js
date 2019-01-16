import { NotFoundError } from '../../src/errors'
import { log } from '../log'

export class Running {
  static async untilFound (asyncFn) {
    try {
      const response = await asyncFn()
      if (!response) {
        log.warn('asyncFn returned empty response.')
      }
      return response
    } catch (e) {
      if (e instanceof NotFoundError) {
        log.debug(`Got not found error on ${e.requestPath}, retrying...`)
        return this.untilFound(asyncFn)
      }
      log.error(`The error got from ${e.requestPath} is not NotFoundError`)
      throw e
    }
  }

  static async untilReturnValueDefined (asyncFn) {
    const response = await asyncFn()
    if (!response) {
      return this.untilReturnValueDefined(asyncFn)
    }
    return response
  }
}
