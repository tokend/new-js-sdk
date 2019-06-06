import xdr from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { UnsignedHyper } from 'js-xdr'
import { BaseOperation } from './base_operation'

export class ManageVoteBuilder {
  /**
   * Create new signer for source account.
   * @param {object} opts
   * @param {string} opts.pollID - ID of poll to voting in
   * @param {number} opts.choice - choice
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.ManageVoteOp}
   */
  static createSingleChoiceVote (opts) {
    if (Number.isNaN(opts.choice)) {
      throw new Error('opts.choice is NaN')
    }

    let attrs = {}

    attrs.data = new xdr.VoteData.singleChoice(new xdr.SingleChoiceVote({
      choice: opts.choice,
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }))

    return this._createVote(opts, attrs)
  }

  static _createVote (opts, attrs) {
    if (isUndefined(opts.pollID)) {
      throw new Error('opts.pollID is undefined')
    }

    attrs.pollId = UnsignedHyper.fromString(opts.pollID)
    attrs.ext = new xdr.CreateVoteDataExt(xdr.LedgerVersion.emptyVersion())

    return this._manageVote(opts, new xdr.ManageVoteOpData.create(
      new xdr.CreateVoteData(attrs)))
  }

  /**
   * Delete existing signer for source account.
   * @param {object} opts
   * @param {string} opts.pollID - ID of poll
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.ManageSignerOp}
   */
  static removeVote (opts) {
    if (isUndefined(opts.pollID)) {
      throw new TypeError('opts.pollID is undefined')
    }

    let removeData = new xdr.RemoveVoteData({
      pollId: UnsignedHyper.fromString(opts.pollID),
      ext: new xdr.RemoveVoteDataExt(xdr.LedgerVersion.emptyVersion())
    })

    return this._manageVote(opts, new xdr.ManageVoteOpData.remove(removeData))
  }

  static _manageVote (opts, data) {
    let op = new xdr.ManageVoteOp({
      data: data,
      ext: new xdr.ManageVoteOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageVote(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static manageVoteToObject (result, attrs) {
    switch (attrs.data().switch()) {
      case xdr.ManageVoteAction.create():
        let createData = attrs.data().createData()
        result.pollID = createData.pollId().toString()
        result.pollType = createData.data()._switch.value
        switch (createData.data().switch()) {
          case xdr.PollType.singleChoice():
            result.choice = createData.data().single().choice().toString()
            break
          default:
            throw new Error('Unexpected poll type ' + createData.data().type().value)
        }
        break
      case xdr.ManageVoteAction.remove():
        result.pollID = attrs.data().removeData().pollId().toString()
        return
      default:
        throw new Error('Unexpected manage vote action')
    }
  }
}
