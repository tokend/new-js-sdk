import { getRequestIdFromResultXdr, Helper } from './_helper'
import { base } from '../../src'
import { Running } from './_running'

export class Data extends Helper {
  /**
   *  @param {object} opts
   * @param {string|number} opts.requestID - set to zero to create new request
   * @param {string} opts.type
   * @param {object} opts.value
   * @param {string} opts.owner
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} ownerKp
   * **/
  async createCreationRequest (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      type: '1',
      value: { something: 'random' },
      owner: ownerKp.accountId()
    }

    const operation = base.DataRequestBuilder.createDataCreationRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)
    return getRequestIdFromResultXdr(response.resultXdr, 'createDataCreationRequestResult')
  }
  /**
   * @param opts
   * @param {string} opts.requestID
   *@param ownerKp
   * **/
  async cancelCreationRequest (opts, ownerKp = this.masterKp) {
    const operation = base.DataRequestBuilder.cancelDataCreationRequest(opts)
    return this.submit(operation, ownerKp)
  }

  /**
   *  @param {object} opts
   * @param {string|number} opts.requestID - set to zero to create new request
   * @param {object} opts.value
   * @param {string | number } opts.id - data id
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} ownerKp
   * **/
  async createUpdateRequest (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      value: { something: 'random' },
      owner: ownerKp.accountId()
    }

    const operation = base.DataRequestBuilder.createDataUpdateRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)
    return getRequestIdFromResultXdr(response.resultXdr, 'createDataUpdateRequestResult')
  }
  /**
   * @param opts
   * @param {string} opts.requestID
   *@param ownerKp
   * **/
  async cancelUpdateRequest (opts, ownerKp = this.masterKp) {
    const operation = base.DataRequestBuilder.cancelDataUpdateRequest(opts)
    return this.submit(operation, ownerKp)
  }

  /**
   *  @param {object} opts
   * @param {string|number} opts.requestID - set to zero to create new request
   * @param {string | number } opts.id - data id
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} ownerKp
   * **/
  async createRemoveRequest (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      owner: ownerKp.accountId()
    }

    const operation = base.DataRequestBuilder.createDataRemoveRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)
    return getRequestIdFromResultXdr(response.resultXdr, 'createDataRemoveRequestResult')
  }
  /**
   * @param opts
   * @param {string} opts.requestID
   *@param ownerKp
   * **/
  async cancelRemoveRequest (opts, ownerKp = this.masterKp) {
    const operation = base.DataRequestBuilder.cancelDataRemoveRequest(opts)
    return this.submit(operation, ownerKp)
  }

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
      ...opts
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

  async mustLoadRequest (requestId) {
    return Running.untilFound(async () => {
      const { data } = await this.api.getWithSignature(`/v3/data_creation_requests/${requestId}`)
      return data
    })
  }

  async mustLoadRequestsList () {
    return Running.untilFound(async () => {
      const { data } = await this.api.getWithSignature(`/v3/data_creation_requests`)
      return data
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
