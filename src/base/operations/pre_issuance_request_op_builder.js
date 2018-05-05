import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { PreIssuanceRequest } from '../pre_issuance_request'

export class PreIssuanceRequestOpBuilder {
  /**
     * Creates operation to review reviewable request
     * @param {object} opts
     * @param {xdr.PreIssuanceRequest} opts.request - signed pre issuance request
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ManageAssetOp}
     */
  static createPreIssuanceRequestOp (opts) {
    let attrs = {}
    attrs.request = opts.request
    attrs.ext = new xdr.CreatePreIssuanceRequestOpExt(
      xdr.LedgerVersion.emptyVersion()
    )

    let preIssuanceRequestOp = new xdr.CreatePreIssuanceRequestOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody
      .createPreissuanceRequest(preIssuanceRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static preIssuanceRequestOpToObject (result, attrs) {
    result.request = PreIssuanceRequest.dataFromXdr(attrs.request())
  }
}
