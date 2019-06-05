import { getRequestIdFromResultXdr, getSuccessResultFromXDR, Helper } from './_helper'
import { base } from '../../src'
import { CancelChangeRoleRequestBuilder } from '../../src/base/operations/cancel_change_role_request_builder'

export class ChangeRole extends Helper {
  /**
   * Creates operation to create KYC request
   * @param {object} opts
   * @param {number|string} opts.requestID - set to zero to create new request
   * @param {string} opts.destinationAccount
   * @param {string} opts.accountRoleToSet
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} opts.creatorDetails - request details set by creator
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the request
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      requestID: '0',
      creatorDetails: { 'test': 'test' }
    }

    const operation = base.CreateChangeRoleRequestBuilder.createChangeRoleRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createChangeRoleRequestResult')
  }

  async cancel (reqId, ownerKp = this.masterKp) {
    const operation = CancelChangeRoleRequestBuilder.cancelChangeRoleRequest({
      requestID: reqId
    })

    const response = await this.submit(operation, ownerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'cancelChangeRoleRequestResult')
  }
}
