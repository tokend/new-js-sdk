import { base } from '../../src'
import { getSuccessResultFromXDR, Helper } from './_helper'
import { accountHelper } from './index'

export class StampHelper extends Helper {
  async makeStamp (opts) {
    const operation = base
      .StampBuilder
      .stamp({
        source: opts.source
      })

    const { resultXdr } = await this.submit(operation, accountHelper.masterKp)

    return getSuccessResultFromXDR(resultXdr, 'stampResult')
  }
}
