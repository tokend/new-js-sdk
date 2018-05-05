import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class CreateAMLRequestBuilder {
  /**
     * Creates operation to create aml alert
     * @param {object} opts
     *
     * @param {string} opts.balanceID - balance for which specified amount will be locked
     * @param {string} opts.amount - amount to be locked
     * @param {string} opts.reason - reason due to which alert was raised
     * @param {string} opts.reference - Unique reference of the alert
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     *
     * @returns {xdr.CreateAMLAlertRequestOp}
     */
  static createAMLAlert (opts) {
    let rawRequest = {}
    if (!BaseOperation.isValidAmount(opts.amount)) {
      throw new Error('opts.amount is invalid')
    }

    rawRequest.amount = BaseOperation._toUnsignedXDRAmount(opts.amount)

    if (!Keypair.isValidBalanceKey(opts.balanceID)) {
      throw new Error('opts.balanceID is invalid')
    }

    rawRequest.balanceId = Keypair.fromBalanceId(opts.balanceID).xdrBalanceId()
    rawRequest.reason = opts.reason
    rawRequest.ext = new xdr.AmlAlertRequestExt(
      xdr.LedgerVersion.emptyVersion()
    )
    let request = new xdr.AmlAlertRequest(rawRequest)

    if (isUndefined(opts.reference)) {
      throw new Error('opts.reference is invalid')
    }

    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.createAmlAlert(
      new xdr.CreateAmlAlertRequestOp({
        amlAlertRequest: request,
        reference: opts.reference,
        ext: new xdr.CreateAmlAlertRequestOpExt(
          xdr.LedgerVersion.emptyVersion()
        )
      })
    )
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createAmlAlertToObject (result, attrs) {
    result.balanceID = BaseOperation
      .balanceIdtoString(attrs.amlAlertRequest().balanceId())
    result.amount = BaseOperation
      ._fromXDRAmount(attrs.amlAlertRequest().amount())
    result.reason = attrs.amlAlertRequest().reason().toString()
    result.reference = attrs.reference().toString()
  }
}
