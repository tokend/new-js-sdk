import { default as xdr } from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import isUndefined from 'lodash/isUndefined'
import { UnsignedHyper } from 'js-xdr'
import { BaseOperation } from './base_operation'

export class ManagePollBuilder {
  /**
   * Create new signer for source account.
   * @param {object} opts
   * @param {string} opts.pollID - ID of poll to voting in
   * @param {number} opts.result - 0 or 1, see PollResult
   * @param {object} opts.details - details
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.ManagePollOp}
   */
  static closePoll (opts) {
    if (isNaN(opts.result)) {
      throw new Error('opts.result is NaN ' + opts.result)
    }

    if (!xdr.PollResult._byValue.has(opts.result)) {
      throw new Error('opts.result is invalid ' + opts.result)
    }

    let attrs = {
      result: xdr.PollResult._byValue.get(opts.result),
      details: JSON.stringify(opts.details),
      ext: new xdr.ClosePollDataExt(xdr.LedgerVersion.emptyVersion())
    }

    return this._managePoll(opts, new xdr.ManagePollOpData.close(new xdr.ClosePollData(attrs)))
  }

  static _managePoll (opts, data) {
    if (isUndefined(opts.pollID)) {
      throw new Error('opts.pollID is undefined')
    }

    let op = new xdr.ManagePollOp({
      pollId: UnsignedHyper.fromString(opts.pollID),
      data: data,
      ext: new xdr.ManagePollOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.managePoll(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static managePollToObject (result, attrs) {
    result.pollID = attrs.pollId().toString()
    switch (attrs.data().switch()) {
      case xdr.ManagePollAction.close():
        let closeData = attrs.data().closePollData()
        result.result = closeData.result().value
        result.details = JSON.parse(closeData.details())
        break
      default:
        throw new Error('Unexpected manage poll action')
    }
  }
}
