import { base } from '../../src'

import { getOpResultFromXDR, Helper } from './_helper'
import { accountHelper } from './index'

export class LicenseHelper extends Helper {
  async create (opts, keys) {
    const operation = base
      .LicenseBuilder
      .buildAndSign(opts, keys)
    const { resultXdr } = await this.submit(operation, accountHelper.masterKp)
    return getOpResultFromXDR(resultXdr, 'licenseResult')
  }
}
