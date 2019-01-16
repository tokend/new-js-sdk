import { NotFoundError } from '../../src/errors'
import { log } from '../log'

export class Running {
  static async untilFound (asyncFn) {
    try {
      const response = await asyncFn()
      if (!response) {
        log.warn('asyncFn returned empty response. It\'s probably because you\'ve passed non-async function to running')
      }
      return response
    } catch (e) {
      if (e instanceof NotFoundError) {
        log.debug('Got not found error, retrying...')
        return this.untilFound(asyncFn)
      }
      log.debug('The error is not NotFound error, returning')
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
