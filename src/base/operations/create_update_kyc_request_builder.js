import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'

export class CreateUpdateKYCRequestBuilder {
  /**
     * Creates operation to create KYC request
     * @param {object} opts
     * @param {number|string} opts.requestID - set to zero to create new request
     * @param {string} opts.accountToUpdateKYC
     * @param {string} opts.accountTypeToSet
     * @param {number} opts.kycLevelToSet
     * @param {object} opts.kycData
     * @param {number|string} opts.allTasks
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CreateUpdateKycRequestOp}
     */
  static createUpdateKYCRequest (opts) {
    let attrs = {}

    if (isUndefined(opts.requestID)) {
      throw new Error('opts.requestID is invalid')
    }

    if (!Keypair.isValidPublicKey(opts.accountToUpdateKYC)) {
      throw new Error('opts.accountToUpdateKYC is invalid')
    }

    attrs.accountToUpdateKyc = Keypair
      .fromAccountId(opts.accountToUpdateKYC)
      .xdrAccountId()
    attrs.accountTypeToSet = BaseOperation
      ._accountTypeFromNumber(opts.accountTypeToSet)
    attrs.kycLevelToSet = opts.kycLevelToSet
    attrs.kycData = JSON.stringify(opts.kycData)
    attrs.allTasks = BaseOperation
      ._checkUnsignedIntValue('allTasks', opts.allTasks)
    attrs.ext = new xdr.UpdateKycRequestDataExt(
      xdr.LedgerVersion.emptyVersion()
    )

    let updateKYCRequestData = new xdr.UpdateKycRequestData(attrs)

    let kycRequestOp = new xdr.CreateUpdateKycRequestOp({
      requestId: UnsignedHyper.fromString(opts.requestID),
      updateKycRequestData: updateKYCRequestData,
      ext: new xdr.CreateUpdateKycRequestOpExt(xdr.LedgerVersion.emptyVersion())
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createKycRequest(kycRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createUpdateKYCRequestOpToObject (result, attrs) {
    result.requestID = attrs.requestId
    result.accountToUpdateKYC = BaseOperation
      .accountIdtoAddress(attrs.updateKycRequestData().accountToUpdateKyc())
    result.accountTypeToSet = attrs
      .updateKycRequestData()
      .accountTypeToSet()
      .value
    result.kycLevelToSet = attrs.updateKycRequestData().kycLevelToSet()
    result.kycData = JSON.parse(attrs.updateKycRequestData().kycData())
    result.allTasks = attrs.updateKycRequestData().allTasks()
  }
}
