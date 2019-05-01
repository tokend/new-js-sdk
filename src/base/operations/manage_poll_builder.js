import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { UnsignedHyper } from 'js-xdr'
import { BaseOperation } from './base_operation'

export class ManagePollBuilder {
  /**
   * Close existing poll with a result.
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

  /**
   * Cancels existing poll.
   * @param {object} opts
   * @param {string} opts.pollID - ID of poll to voting in
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.ManagePollOp}
   */
  static cancelPoll (opts) {
    return this._managePoll(opts,
      new xdr.ManagePollOpData.cancel(new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())))
  }

  /**
   * Updates poll end time.
   * @param {object} opts
   * @param {string} opts.pollID - ID of poll to voting in
   * @param {string} opts.newEndTime - end time to set
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.ManagePollOp}
   */
  static updatePollEndTime (opts) {
    if (isUndefined(opts.newEndTime)) {
      throw new Error('opts.newEndTime is undefined')
    }
    let endTime = UnsignedHyper.fromString(opts.newEndTime)

    let attrs = {
      newEndTime: endTime,
      ext: new xdr.UpdatePollEndTimeDataExt(xdr.LedgerVersion.emptyVersion())
    }
    return this._managePoll(opts,
      new xdr.ManagePollOpData
        .updateEndTime(new xdr.UpdatePollEndTimeData(attrs)))
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
      case xdr.ManagePollAction.cancel():
        break
      case xdr.ManagePollAction.updateEndTime():
        let updateEndTimeData = attrs.data().updateTimeData()
        result.newEndTime = updateEndTimeData.newEndTime().toString()
        break
      default:
        throw new Error('Unexpected manage poll action')
    }
  }
}
