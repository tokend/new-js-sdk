import { base } from '../../src'

import { getOpResultFromXDR, Helper } from './_helper'

export class SetOptionsHelper extends Helper {
  async addSigner (opts) {
    const operation = base
      .SetOptionsBuilder
      .setOptions(opts)
    const { resultXdr } = await this.submit(operation)
    const res = getOpResultFromXDR(resultXdr, 'setOptionsResult')
    return res
  }
}
