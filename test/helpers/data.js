import { Helper } from './_helper'
import { base } from '../../src'
import { Running } from './_running'

export class Data extends Helper {
  /**
   *
   * @param opts
   * @param {string} [opts.type]
   * @param {object} [opts.value]
   * @param ownerKp
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      type: '1',
      value: { something: 'random' }
    }

    const operation = base.CreateDataBuilder.createData({
      ...DEFAULTS,
      ...opts,
    })

    const response = await this.submit(operation, ownerKp)
    return getEntryIDFromResultXdr(response.resultXdr)
  }

  /**
   *
   * @param opts
   * @param {string} opts.dataId
   * @param {object} opts.value
   * @param ownerKp
   */
  async update (opts, ownerKp = this.masterKp) {
    const operation = base.UpdateDataBuilder.updateData(opts)
    return this.submit(operation, ownerKp)
  }

  remove (dataId, ownerKp = this.masterKp) {
    const operation = base.RemoveDataBuilder.removeData({ dataId })
    return this.submit(operation, ownerKp)
  }

  async mustLoad (dataId) {
    return Running.untilFound(async () => {
      const { data } = await this.api.getWithSignature(`/v3/data/${dataId}`)
      return data
    })
  }

  async mustNotFound (dataId) {
    return Running.untilNotFound(async () => {
      await this.api.getWithSignature(`/v3/data/${dataId}`)
    })
  }
}

function getEntryIDFromResultXdr (resultXdr) {
  return base
    .xdr
    .TransactionResult
    .fromXDR(Buffer.from(resultXdr, 'base64'))
    .result()
    .results()[0]
    .tr()
    .createDataResult()
    .success()
    .dataId()
    .toString()
}
