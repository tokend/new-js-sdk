import { NotFoundError } from '../../src/errors'

export class Running {
  static async untilFound (asyncFn) {
    try {
      const response = await asyncFn()
      if (!response) {
        console.log('asyncFn returned empty response. It\'s probably because you\'ve passed non-async function to running')
      }
      return response
    } catch (e) {
      if (e instanceof NotFoundError) {
        console.log('Got not found error, retrying...')
        return this.untilFound(asyncFn)
      }
      console.log('The error is not NotFound error, returning')
      throw e
    }
  }

  static async untilReturn (asyncFn) {
    const response = await asyncFn()
    if (!response) {
      return this.untilReturn(asyncFn)
    }
    return response
  }
}
