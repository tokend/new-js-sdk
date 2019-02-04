import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'

export class CreateChangeRoleRequestBuilder {
  /**
     * Creates operation to create KYC request
     * @param {object} opts
     * @param {number|string} opts.requestID - set to zero to create new request
     * @param {string} opts.destinationAccount
     * @param {string} opts.accountRoleToSet
     * @param {object} opts.kycData
     * @param {number|string} opts.allTasks
     *
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CreateChangeRoleRequestOp}
     */
  static createChangeRoleRequest (opts) {
    let attrs = {}

    if (isUndefined(opts.requestID)) {
      throw new Error('opts.requestID is invalid')
    }

    if (!Keypair.isValidPublicKey(opts.destinationAccount)) {
      throw new Error('opts.accountToUpdateKYC is invalid')
    }

    attrs.destinationAccount = Keypair
      .fromAccountId(opts.destinationAccount)
      .xdrAccountId()
    attrs.accountRoleToSet = UnsignedHyper.fromString(opts.accountRoleToSet)
    attrs.kycData = JSON.stringify(opts.kycData)

    attrs.requestId = UnsignedHyper.fromString(opts.requestID)
    attrs.allTasks = BaseOperation._checkUnsignedIntValue('allTasks', opts.allTasks)
    attrs.ext = new xdr.CreateChangeRoleRequestOpExt(xdr.LedgerVersion.emptyVersion())

    let kycRequestOp = new xdr.CreateChangeRoleRequestOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createChangeRoleRequest(kycRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createChangeRoleRequestOpToObject (result, attrs) {
    result.requestID = attrs.requestId
    result.destinationAccount = BaseOperation.accountIdtoAddress(attrs.destinationAccount())
    result.accountRoleToSet = attrs.accountRoleToSet().toString()
    result.kycData = JSON.parse(attrs.kycData())
    result.allTasks = attrs.allTasks()
  }
}
